import { BaseResponse } from '@/types/response';

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

interface NextFetchResponseConfig extends NextFetchRequestConfig {
  url: string;
  status: number;
}

// 응답 인터셉터 인터페이스
interface ResponseInterceptor {
  onResponse<T>(response: BaseResponse<T>): Promise<BaseResponse<T>> | BaseResponse<T>;
  onError<T>(config: NextFetchResponseConfig): Promise<BaseResponse<T>> | BaseResponse<T>;
}

export class HttpClient {
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
          'Content-Type': 'application/json',
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
      credentials: 'include',
      cache: method === 'GET' ? 'force-cache' : undefined,
      headers: {
        ...config.headers,
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

    // 응답 config 생성
    const responseConfig = {
      ...fetchConfig,
      status: response.status,
      url: `${this.baseURL}${url}`,
    };

    // 모든 응답 인터셉터 순차적 실행
    for (const interceptor of this.responseInterceptors) {
      if (response.ok) {
        result = await interceptor.onResponse(result);
      } else if (response.status === 401) {
        result = await interceptor.onError(responseConfig);
      }
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

const httpClient = HttpClient.getInstance();

httpClient.addRequestInterceptor({
  onRequest: async (config) => {
    if (typeof window !== 'undefined') {
      // client 컴포넌트일 때 세션에서 accessToken 추가
      const { useAuthStore } = await import('@/store/useAuthStore');
      const accessToken = useAuthStore((state) => state.accessToken);

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    } else {
      // server 컴포넌트일 때 쿠키에서 accessToken 추가
      const { getToken } = await import('@/app/lib/server/cookies');

      const { accessToken } = await getToken();

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
});

httpClient.addResponseInterceptor({
  // 성공 응답일때는 그대로 리턴
  onResponse: async (response) => {
    return response;
  },

  // 에러 응답
  onError: async (config) => {
    let cookie;

    // 쿠키 얻어오기
    if (typeof window !== 'undefined') {
      cookie = document.cookie;
    } else {
      const { getServerCookies } = await import('@/app/lib/server/cookies');
      cookie = await getServerCookies();
    }

    try {
      // refresh 요청
      const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
        method: 'POST',
        // 쿠키를 담아서 요청
        headers: {
          Cookie: cookie,
        },
        credentials: 'include',
      });

      // 새로운 accessToken을 받아옴
      const {
        data: { accessToken },
      } = await refreshResponse.json();

      // 새로운 accessToken을 가지고 재요청
      const originalResponse = await fetch(config.url, {
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return await originalResponse.json();
    } catch (error) {
      console.error(error);
      // refresh 실패했을 때는 401 에러로 리턴
      return {
        success: false,
        status: 401,
        message: '401 에러 발생',
      };
    }
  },
});

export default httpClient;
