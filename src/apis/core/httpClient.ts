import { BaseResponse } from '@/lib/server/response';

// HTTP 요청 메서드 타입 정의
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// 요청 인터셉터 인터페이스
interface RequestInterceptor {
  onRequest(config: RequestInit): Promise<RequestInit> | RequestInit;
}

// 응답 인터셉터 인터페이스
interface ResponseInterceptor {
  onResponse<T>(response: BaseResponse<T>): Promise<BaseResponse<T>> | BaseResponse<T>;
}

export class HttpClient {
  // 싱글톤 인스턴스를 저장하는 정적 변수
  private static instance: HttpClient;
  // API 기본 URL
  private readonly baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';
  // 요청/응답 인터셉터 배열
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  // 생성자 private로 선언해서 외부에서 직접 인스턴스화 못하게
  private constructor() {}

  // 싱글톤 인스턴스를 얻는 메서드
  // 최초 호출시 인스턴스 생성 및 기본 인터셉터 설정
  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
      HttpClient.instance.setupDefaultInterceptors();
    }
    return HttpClient.instance;
  }

  private async getCookies(): Promise<string> {
    if (typeof window !== 'undefined') {
      return document.cookie;
    }

    if (process.env.NODE_ENV === 'test') {
      return '';
    }

    const { getServerCookies } = await import('@/app/lib/server/cookies');

    return getServerCookies();
  }

  // 요청 인터셉터 추가하는 메서드
  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  // 응답 인터셉터 추가하는 메서드
  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  // 기본 인터셉터 설정
  private setupDefaultInterceptors(): void {
    // 기본 요청 인터셉터
    this.addRequestInterceptor({
      onRequest: (config) => ({
        ...config,
        headers: {
          ...config.headers,
        },
      }),
    });
  }

  /**
   * HTTP 요청을 실행하는 메서드
   * @param method  - HTTP 메서드
   * @param url - 요청 URL
   * @param data - 요청 바디 데이터
   * @param config - fetch API의 추가 설정
   * @returns - API 응답
   */
  private async request<T>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config: RequestInit = {},
  ): Promise<BaseResponse<T>> {
    // 기본 설정과 사용자 설정을 병합
    let fetchConfig: RequestInit = {
      ...config,
      method,
      headers: {
        ...config.headers,
        Cookie: await this.getCookies(),
      },
    };

    // 모든 요청 인터셉터 순차적 실행
    for (const interceptor of this.requestInterceptors) {
      fetchConfig = await interceptor.onRequest(fetchConfig);
    }

    // GET 요청이 아닐 경우에만 body 설정
    if (data && method !== 'GET') {
      fetchConfig.body = JSON.stringify(data);
    }

    // fetch 요청 실행 및 JSON 파싱
    const response = await fetch(`${this.baseURL}${url}`, fetchConfig);
    const jsonData: BaseResponse<T> = await response.json();

    // 모든 응답 인터셉터 순차적 실행
    let result = jsonData;
    for (const interceptor of this.responseInterceptors) {
      result = await interceptor.onResponse(result);
    }

    return result;
  }

  public async get<T>(url: string, config?: RequestInit): Promise<BaseResponse<T>> {
    return this.request<T>('GET', url, undefined, config);
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<BaseResponse<T>> {
    return this.request<T>('POST', url, data, config);
  }

  public async put<T>(url: string, data?: unknown, config?: RequestInit): Promise<BaseResponse<T>> {
    return this.request<T>('PUT', url, data, config);
  }

  public async patch<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<BaseResponse<T>> {
    return this.request<T>('PATCH', url, data, config);
  }

  public async delete<T>(
    url: string,
    data?: unknown,
    config?: RequestInit,
  ): Promise<BaseResponse<T>> {
    return this.request<T>('DELETE', url, data, config);
  }
}

export const httpClient = HttpClient.getInstance();
