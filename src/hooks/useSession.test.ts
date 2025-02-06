import { server } from '@/mocks/node';
import { act, renderHook } from '@testing-library/react';
import { getCookie } from 'cookies-next';
import { HttpResponse, http } from 'msw';
import { useAuthStore } from '@/store/useAuthStore';
import { useSession } from './useSession';

jest.mock('cookies-next');
jest.mock('@/store/useAuthStore');

const mockUser = {
  id: 1,
  email: 'test@example.com',
  name: 'user',
  image: 'https://example.com/image.jpg',
};

describe('useSession test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      accessToken: null,
      setAccessToken: jest.fn(),
    });
  });

  test('cookie에 accessToken이 없으면 인증되지 않은 상태여야 한다', async () => {
    (getCookie as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useSession());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.authenticated).toBe(false);
    expect(result.current.user).toBeUndefined();
  });

  test('cookie에 accessToken이 있으면 인증된 상태여야 하고 유저 정보를 가져와야 한다', async () => {
    const mockToken = 'mock-token';
    (getCookie as jest.Mock).mockReturnValue(mockToken);

    server.use(
      http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, () => {
        return HttpResponse.json({
          success: true,
          data: mockUser,
        });
      }),
    );

    const { result } = renderHook(() => useSession());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.authenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });
});
