import registerRoom from '@/mocks/fixtures/registerRoom.json';
import { server } from '@/mocks/node';
import { act, renderHook } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { useAuthStore } from '@/store/useAuthStore';
import { useRoomStore } from '@/store/useRoomStore';
import { useRegisterRoom } from './useRegisterRoom';

jest.mock('@/store/useAuthStore');
jest.mock('@/store/useRoomStore');

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('useRegisterRoom test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue('mock-token');
    (useRoomStore as unknown as jest.Mock).mockReturnValue({ room: null });
    (useRoomStore.persist.hasHydrated as jest.Mock) = jest.fn().mockReturnValue(true);
  });

  test('초기 room이 있을 경우 해당 room을 반환한다', async () => {
    (useRoomStore as unknown as jest.Mock).mockReturnValue({ room: registerRoom });

    const { result } = renderHook(() => useRegisterRoom(1));

    await act(() => Promise.resolve());

    expect(result.current.room).toEqual(registerRoom);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  test('초기 room이 없을 경우 API를 호출하여 room을 가져온다', async () => {
    server.use(
      http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/1`, () => {
        return HttpResponse.json({
          success: true,
          data: registerRoom,
          status: 200,
        });
      }),
    );

    const { result } = renderHook(() => useRegisterRoom(1));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.room).toEqual(registerRoom);
  });

  test('hydration이 완료되지 않았을 경우 room은 undefined이다', async () => {
    (useRoomStore.persist.hasHydrated as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useRegisterRoom(1));

    await act(() => Promise.resolve());

    expect(result.current.room).toBeUndefined();
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
