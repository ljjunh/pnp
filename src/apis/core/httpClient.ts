import { revalidateTag } from 'next/cache';

// API 에러 타입 정의
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// 요청 키 생성을 위한 인터페이스
interface RequestKey {
  method: HttpMethod;
  url: string;
  data?: unknown;
}

// 캐시 태그를 포함한 요청 설정 인터페이스
interface RequestConfig extends RequestInit {
  tags?: string[]; // 캐시 태그 배열
}

export class HttpClient {
  // 싱글톤 인스턴스를 저장할 private static 변수
  private static instance: HttpClient;
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  private static readonly TIMEOUT = 5000;
  private static readonly isServer = typeof window === 'undefined';

  // 진행중인 요청을 저장하는 Map(CSR에서만 사용)
  private pendingRequests = new Map<string, AbortController>();

  // 생성자를 private으로 선언해서 new 키워드를 통한 인스턴스 생성을 방지
  private constructor() {}

  // 싱글톤 인스턴스를 반환하는 메서드
  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  // 요청 키를 생성하는 메서드
  private createRequestKey({ method, url, data }: RequestKey): string {
    return `${method}:${url}:${data ? JSON.stringify(data) : ''}`;
  }

  // 이전 중복 요청을 취소하는 메서드
  private abortPreviousRequest(requestKey: string): void {
    // SSR에서는 중복 요청 처리 못함
    if (HttpClient.isServer) return;

    const previousController = this.pendingRequests.get(requestKey);
    if (previousController) {
      previousController.abort();
      this.pendingRequests.delete(requestKey);
    }
  }

  // 요청 데이터 처리 메서드
  private processRequestData(data: unknown): string | FormData {
    // SSR에서는 FormData 사용 못함
    // CSR이고 FormData일때만 FormData 반환
    if (!HttpClient.isServer && data instanceof FormData) {
      return data;
    }
    // 나머지는 JSON 직렬화
    return JSON.stringify(data);
  }

  // Content-Type 헤더 결정 메서드
  private getContentType(data: unknown): string | undefined {
    // CSR이고 FormData일때만 undefined반환
    // FormData는 브라우저가 자동으로 Content-Type을 설정함
    if (!HttpClient.isServer && data instanceof FormData) {
      return undefined;
    }
    return 'application/json';
  }

  // 응답 처리 메서드
  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data.message || '서버 에러가 발생했습니다.', data);
    }

    return data;
  }

  // 모든 HTTP 요청의 기본 로직을 처리하는 private 메서드
  private async request<ResponseType, RequestType = never>(
    method: HttpMethod,
    url: string,
    data?: RequestType,
    config: RequestConfig = {},
  ): Promise<ResponseType> {
    const requestKey = this.createRequestKey({ method, url, data });

    // AbortController는 CSR에서만 사용
    let controller: AbortController | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    if (!HttpClient.isServer) {
      this.abortPreviousRequest(requestKey);
      controller = new AbortController();
      this.pendingRequests.set(requestKey, controller);
      timeoutId = setTimeout(() => controller?.abort(), HttpClient.TIMEOUT);
    }

    try {
      const headers: Record<string, string> = {};
      let processedData: string | FormData | undefined;

      if (data && method !== 'GET') {
        processedData = this.processRequestData(data);
        const contentType = this.getContentType(data);
        if (contentType) {
          headers['Content-Type'] = contentType;
        }
      }

      // fetch 설정에 캐시 태그 옵션 추가
      const fetchConfig: RequestInit & { next?: { tags?: string[] } } = {
        method,
        headers,
        ...(controller && { signal: controller.signal }),
        ...config,
      };

      // GET 요청이고 tags가 있는 경우에만 Next 옵션 추가
      if (method === 'GET' && config.tags?.length) {
        fetchConfig.next = {
          tags: config.tags,
        };
      }

      if (processedData) {
        fetchConfig.body = processedData;
      }

      const response = await fetch(`${HttpClient.BASE_URL}${url}`, fetchConfig);

      if (!HttpClient.isServer) {
        timeoutId && clearTimeout(timeoutId); // 성공적으로 응답 받으면 타임아웃 해제
        this.pendingRequests.delete(requestKey);
      }

      return this.handleResponse<ResponseType>(response);
    } catch (error) {
      if (!HttpClient.isServer) {
        // 에러 발생시에도 타임아웃 해제
        timeoutId && clearTimeout(timeoutId);
        this.pendingRequests.delete(requestKey);
      }

      // AbortError 타임아웃 처리
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError(
          408, // Request Timeout
          '요청 시간이 초과되었습니다.',
          error,
        );
      }

      // 이미 APIError로 에러는 그대로 전달
      if (error instanceof ApiError) {
        throw error;
      }
      // 그 외 에러는 네트워크 에러로 처리
      // TODO: 이거 처리 어떻게할지 생각해보자
      throw new ApiError(500, '네트워크 에러가 발생했습니다.', error);
    }
  }

  // HTTP 메서드별 공개 메서드들
  public async get<ResponseType>(url: string, config?: RequestConfig): Promise<ResponseType> {
    return this.request<ResponseType>('GET', url, undefined, config);
  }

  public async post<ResponseType, RequestType>(
    url: string,
    data: RequestType,
    config?: RequestConfig,
  ): Promise<ResponseType> {
    const response = await this.request<ResponseType, RequestType>('POST', url, data, config);
    // POST 요청 후 지정된 태그의 캐시 무효화
    config?.tags?.forEach((tag) => revalidateTag(tag));
    return response;
  }

  public async put<ResponseType, RequestType>(
    url: string,
    data: RequestType,
    config?: RequestConfig,
  ): Promise<ResponseType> {
    const response = await this.request<ResponseType, RequestType>('PUT', url, data, config);
    // PUT 요청 후 지정된 태그의 캐시 무효화
    config?.tags?.forEach((tag) => revalidateTag(tag));
    return response;
  }

  public async patch<ResponseType, RequestType>(
    url: string,
    data: RequestType,
    config?: RequestConfig,
  ): Promise<ResponseType> {
    const response = await this.request<ResponseType, RequestType>('PATCH', url, data, config);
    // PATCH 요청 후 지정된 태그의 캐시 무효화
    config?.tags?.forEach((tag) => revalidateTag(tag));
    return response;
  }

  public async delete<ResponseType, RequestType>(
    url: string,
    data?: RequestType,
    config?: RequestConfig,
  ): Promise<ResponseType> {
    const response = await this.request<ResponseType, RequestType>('DELETE', url, data, config);
    // DELETE 요청 후 지정된 태그의 캐시 무효화
    config?.tags?.forEach((tag) => revalidateTag(tag));
    return response;
  }
}

// 외부에서 사용할 수 있는 인스턴스 생성
export const httpClient = HttpClient.getInstance();
