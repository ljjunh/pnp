import { cookies } from 'next/headers';
import { getServerCookies } from '@/app/lib/server/cookies';

// next/headers의 cookies 모듈을 모킹
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('getServerCookies', () => {
  // 각 테스트 전에 모든 mock을 초기화
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('쿠키가 없을 때 빈 문자열을 반환한다', async () => {
    // given
    const mockCookieStore = {
      getAll: jest.fn().mockReturnValue([]),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);

    // when
    const result = await getServerCookies();

    // then
    expect(result).toBe('');
    expect(mockCookieStore.getAll).toHaveBeenCalledTimes(1);
  });

  it('단일 쿠키를 올바른 형식으로 반환한다', async () => {
    // given
    const mockCookieStore = {
      getAll: jest.fn().mockReturnValue([
        {
          name: 'testCookie',
          value: 'testValue',
        },
      ]),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);

    // when
    const result = await getServerCookies();

    // then
    expect(result).toBe('testCookie=testValue');
    expect(mockCookieStore.getAll).toHaveBeenCalledTimes(1);
  });

  it('여러 쿠키를 세미콜론으로 구분하여 반환한다', async () => {
    // given
    const mockCookieStore = {
      getAll: jest.fn().mockReturnValue([
        {
          name: 'cookie1',
          value: 'value1',
        },
        {
          name: 'cookie2',
          value: 'value2',
        },
        {
          name: 'cookie3',
          value: 'value3',
        },
      ]),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);

    // when
    const result = await getServerCookies();

    // then
    expect(result).toBe('cookie1=value1; cookie2=value2; cookie3=value3');
    expect(mockCookieStore.getAll).toHaveBeenCalledTimes(1);
  });

  it('에러가 발생했을 때 적절히 처리된다', async () => {
    // given
    const mockCookieStore = {
      getAll: jest.fn().mockImplementation(() => {
        throw new Error('Failed to get cookies');
      }),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);

    // when & then
    await expect(getServerCookies()).rejects.toThrow('Failed to get cookies');
    expect(mockCookieStore.getAll).toHaveBeenCalledTimes(1);
  });
});
