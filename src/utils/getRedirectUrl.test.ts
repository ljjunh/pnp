import { cookies } from 'next/headers';
import { getRedirectUrl } from './getRedirectUrl';

// next/headers의 cookies 모킹
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('getRedirectURL', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('prevPath 쿠키가 있으면 해당 값을 반환한다', () => {
    const mockCookieStore = {
      get: jest.fn().mockReturnValue({ value: '/dashboard' }),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);

    const result = getRedirectUrl();

    expect(result).toBe('/dashboard');
    expect(mockCookieStore.get).toHaveBeenCalledWith('prevPath');
  });

  it('prevPath 쿠키가 없으면 기본값 "/"를 반환한다', () => {
    const mockCookieStore = {
      get: jest.fn().mockReturnValue(undefined),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);

    const result = getRedirectUrl();

    expect(result).toBe('/');
    expect(mockCookieStore.get).toHaveBeenCalledWith('prevPath');
  });

  it('prevPath 쿠키 값이 빈 문자열이면 기본값 "/"를 반환한다', () => {
    const mockCookieStore = {
      get: jest.fn().mockReturnValue({ value: '' }),
    };
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);

    const result = getRedirectUrl();

    expect(result).toBe('/');
    expect(mockCookieStore.get).toHaveBeenCalledWith('prevPath');
  });
});
