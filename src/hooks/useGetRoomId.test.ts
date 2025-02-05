import { act, renderHook } from '@testing-library/react';
import { createRoomId } from '@/apis/register/action';
import { getProgressRoomId } from '@/apis/register/queries';
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

jest.mock('@/apis/register/queries', () => ({
  getProgressRoomId: jest.fn(),
}));

describe('useGetRoomId test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('진행 중인 roomId가 있으면 해당 페이지로 이동한다', async () => {
    (getProgressRoomId as jest.Mock).mockResolvedValue(1);

    const { result } = renderHook(() => useGetRoomId());

    await act(async () => {
      await result.current.getRoomId();
    });

    expect(mockPush).toHaveBeenCalledWith('/host/1');
    expect(result.current.isLoading).toBe(false);
  });

  test('진행 중인 roomId가 없으면 새로운 roomId를 생성한다', async () => {
    (getProgressRoomId as jest.Mock).mockResolvedValue(0);

    (createRoomId as jest.Mock).mockResolvedValue({
      success: true,
      data: 1,
    });

    const { result } = renderHook(() => useGetRoomId());

    await act(async () => {
      result.current.getRoomId();
    });

    expect(mockPush).toHaveBeenCalledWith('/host/1');
    expect(result.current.isLoading).toBe(false);
  });

  test('로그인이 되어있지 않을 때 로그인 페이지로 이동한다.', async () => {
    (getProgressRoomId as jest.Mock).mockResolvedValue(0);

    (createRoomId as jest.Mock).mockResolvedValue({
      success: false,
      status: 401,
      message: '인증되지 않은 요청입니다.',
    });

    const { result } = renderHook(() => useGetRoomId());

    await act(async () => {
      await result.current.getRoomId();
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
      description: '숙소 등록에 실패했습니다. 잠시 후 다시 시도해주세요.',
      variant: 'destructive',
    });
    expect(result.current.isLoading).toBe(false);
  });

  test('에러가 발생한 경우 에러 토스트 메시지가 표시된다.', async () => {
    (createRoomId as jest.Mock).mockRejectedValue({
      status: 500,
      success: false,
      message: '숙소 정보를 얻어오는 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });

    const { result } = renderHook(() => useGetRoomId());

    await act(async () => {
      result.current.getRoomId();
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: '숙소 등록에 실패했습니다.',
      description: '숙소 정보를 얻어오는 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
      variant: 'destructive',
    });
    expect(result.current.isLoading).toBe(false);
  });
});
