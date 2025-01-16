import { act, renderHook } from '@testing-library/react';
import { createRoomId } from '@/apis/register/action';
import useGetRoomId from '@/hooks/useGetRoomId';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

const mockToast = jest.fn();
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(() => ({
    toast: mockToast,
  })),
}));

jest.mock('@/apis/register/action', () => ({
  createRoomId: jest.fn(),
}));

describe('useGetRoomId test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('숙소 등록에 성공했을 때 roomId로 이동한다', async () => {
    (createRoomId as jest.Mock).mockResolvedValue({
      success: true,
      data: { roomId: '1' },
    });

    const { result } = renderHook(() => useGetRoomId());

    await act(async () => {
      result.current.getRoomId();
    });

    expect(mockPush).toHaveBeenCalledWith('/host/1');
    expect(result.current.isLoading).toBe(false);
  });

  test('로그인이 되어있지 않을 때 로그인 페이지로 이동한다.', async () => {
    (createRoomId as jest.Mock).mockResolvedValue({
      success: false,
      status: 401,
    });

    const { result } = renderHook(() => useGetRoomId());

    await act(async () => {
      result.current.getRoomId();
    });

    expect(mockPush).toHaveBeenCalledWith('/signin');
    expect(result.current.isLoading).toBe(false);
  });

  test('429 에러 발생 시 에러 토스트 메시지가 표시된다.', async () => {
    (createRoomId as jest.Mock).mockResolvedValue({
      success: false,
      status: 429,
      message: '숙소 등록은 5분에 한 번 씩만 가능합니다.',
    });

    const { result } = renderHook(() => useGetRoomId());

    await act(async () => {
      result.current.getRoomId();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '숙소 등록 횟수 제한',
      description: '숙소 등록은 5분에 한 번 씩만 가능합니다.',
      variant: 'destructive',
    });
    expect(result.current.isLoading).toBe(false);
  });

  test('500 에러 발생 시 에러 토스트 메시지가 표시된다.', async () => {
    (createRoomId as jest.Mock).mockResolvedValue({
      success: false,
      status: 500,
      message: '숙소 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    });

    const { result } = renderHook(() => useGetRoomId());

    await act(async () => {
      result.current.getRoomId();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '숙소 등록에 실패했습니다.',
      description: '숙소 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      variant: 'destructive',
    });
    expect(result.current.isLoading).toBe(false);
  });

  test("response.data가 없는 경우 '숙소 등록에 실패했습니다.' 에러 토스트 메시지가 표시된다.", async () => {
    (createRoomId as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { result } = renderHook(() => useGetRoomId());

    await act(async () => {
      result.current.getRoomId();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '숙소 등록에 실패했습니다.',
      description: '숙소 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      variant: 'destructive',
    });
    expect(result.current.isLoading).toBe(false);
  });

  test("에러가 발생한 경우 '숙소 등록에 실패했습니다.' 에러 토스트 메시지가 표시된다.", async () => {
    (createRoomId as jest.Mock).mockRejectedValue(new Error());

    const { result } = renderHook(() => useGetRoomId());

    await act(async () => {
      result.current.getRoomId();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '숙소 등록에 실패했습니다.',
      description: '숙소 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      variant: 'destructive',
    });
    expect(result.current.isLoading).toBe(false);
  });
});
