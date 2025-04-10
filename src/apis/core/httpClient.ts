import { BaseResponse } from '@/lib/server/response';

// HTTP 요청 메서드 타입 정의
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// 요청 인터셉터 인터페이스
interface RequestInterceptor {
  onRequest(
    config: NextFetchRequestConfig,
  ): Promise<NextFetchRequestConfig> | NextFetchRequestConfig;
}

// 응답 인터셉터 인터페이스
interface ResponseInterceptor {
  onResponse<T>(response: BaseResponse<T>): Promise<BaseResponse<T>> | BaseResponse<T>;
}

export class HttpClient {
  protected static instance: HttpClient;
  // API 기본 URL
  protected readonly baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';
  // 요청/응답 인터셉터 배열
  protected requestInterceptors: RequestInterceptor[] = [];
  protected responseInterceptors: ResponseInterceptor[] = [];

  // 생성자 private로 선언해서 외부에서 직접 인스턴스화 못하게
  protected constructor() {}

  // 싱글톤 인스턴스를 얻는 메서드
  // 최초 호출시 인스턴스 생성 및 기본 인터셉터 설정
  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
      HttpClient.instance.setupDefaultInterceptors();
    }
    return HttpClient.instance;
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
  protected setupDefaultInterceptors(): void {
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
  protected async request<T>(
    method: HttpMethod,
    url: string,
    data?: unknown,
    config: NextFetchRequestConfig = {},
  ): Promise<BaseResponse<T>> {
    // 기본 설정과 사용자 설정을 병합
    let fetchConfig: NextFetchRequestConfig = {
      ...config,
      method,
      cache: method === 'GET' ? 'force-cache' : undefined,
      headers: {
        ...config.headers,
        // Cookie: await this.getCookies(),
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

    // fetch 요청 실행
    const response = await fetch(`${this.baseURL}${url}`, fetchConfig);
    let result;

    // response body 처리
    try {
      // body가 있는 응답의 경우 JSON으로 파싱
      result = await response.json();
    } catch {
      // body가 없는 성공 응답(204 No Content, 304 Not Modified 등)을 BaseResponse로 처리
      if (response.ok) {
        result = {
          success: true,
          status: response.status,
          message: response.statusText,
          data: null,
        } as BaseResponse<T>;
      }
    }

    // 모든 응답 인터셉터 순차적 실행
    for (const interceptor of this.responseInterceptors) {
      result = await interceptor.onResponse(result);
    }

    return result;
  }

  public async get<T>(url: string, config?: NextFetchRequestConfig): Promise<BaseResponse<T>> {
    return this.request<T>('GET', url, undefined, config);
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: NextFetchRequestConfig,
  ): Promise<BaseResponse<T>> {
    return this.request<T>('POST', url, data, config);
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: NextFetchRequestConfig,
  ): Promise<BaseResponse<T>> {
    return this.request<T>('PUT', url, data, config);
  }

  public async patch<T>(
    url: string,
    data?: unknown,
    config?: NextFetchRequestConfig,
  ): Promise<BaseResponse<T>> {
    return this.request<T>('PATCH', url, data, config);
  }

  public async delete<T>(
    url: string,
    data?: unknown,
    config?: NextFetchRequestConfig,
  ): Promise<BaseResponse<T>> {
    return this.request<T>('DELETE', url, data, config);
  }
}

export class AuthHttpClient extends HttpClient {
  protected static instance: AuthHttpClient;

  private constructor() {
    super();
    this.setupDefaultInterceptors();
  }

  public static getInstance(): AuthHttpClient {
    if (!AuthHttpClient.instance) {
      AuthHttpClient.instance = new AuthHttpClient();
    }
    return AuthHttpClient.instance;
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
  protected setupDefaultInterceptors(): void {
    super.setupDefaultInterceptors();

    this.addRequestInterceptor({
      onRequest: async (config) => ({
        ...config,
        cache: 'no-store',
        headers: {
          ...config.headers,
          Cookie: await this.getCookies(),
        },
      }),
    });
  }
}

export const httpClient = HttpClient.getInstance();
export const authHttpClient = AuthHttpClient.getInstance();
