import { useSession } from 'next-auth/react';
import { act, renderHook } from '@testing-library/react';
import { createScrap, deleteScrap } from '@/apis/rooms/actions';
import { useRoomScrap } from '@/hooks/useRoomScrap';
import { ROUTES } from '@/constants/routeURL';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

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

jest.mock('@/apis/rooms/actions', () => ({
  createScrap: jest.fn(),
  deleteScrap: jest.fn(),
}));

describe('useRoomScrap', () => {
  const roomId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('초기 isScarp 상태는 initialIsScarp 값으로 설정되어야 한다', () => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { id: 1 } } });
    const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: true }));

    expect(result.current.isScrap).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  test('초기값이 false일때 toggleScarp 호출시 세션이 없으면 로그인 페이지로 리다이렉트된다', async () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: false }));

    await act(async () => {
      result.current.toggleScrap();
    });

    expect(mockPush).toHaveBeenCalledWith(ROUTES.LOGIN);
  });

  test('초기값이 true일때 toggleScarp 호출시 세션이 없으면 로그인 페이지로 리다이렉트된다', async () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: true }));

    await act(async () => {
      result.current.toggleScrap();
    });

    expect(mockPush).toHaveBeenCalledWith(ROUTES.LOGIN);
  });

  test('toggleScarp 호출시 isScarp이 true면 removeFromScarps가 실행되어야 한다', async () => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { id: 1 } } });
    (deleteScrap as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: true }));

    await act(async () => {
      result.current.toggleScrap();
    });

    expect(deleteScrap).toHaveBeenCalledWith(roomId);
  });

  test('toggleScarp 호출시 isScarp이 false면 addToScarps가 실행되어야 한다', async () => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { id: 1 } } });
    (createScrap as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: false }));

    await act(async () => {
      result.current.toggleScrap();
    });

    expect(createScrap).toHaveBeenCalledWith(roomId);
  });

  describe('addToScraps', () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({ data: { user: { id: 1 } } });
    });

    test('요청 중에는 로딩 상태가 true가 되고 낙관적 업데이트가 되어야 한다', async () => {
      // Promise를 외부에서 제어하기 위한 resolver
      let promiseResolver: (value: { success: boolean; status?: number; message?: string }) => void;

      // createScarp API를 Promise를 반환하도록 모킹
      // 이 Promise는 바로 resolve되지 않고, promiseResolver를 호출할 때까지 대기
      (createScrap as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            promiseResolver = resolve;
          }),
      );

      const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: false }));

      await act(async () => {
        result.current.toggleScrap();
      });

      // API 호출이 진행 중일 대의 상태 체크
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isScrap).toBe(true);

      // promiseResolver를 호출하여 API 호출이 성공적으로 완료되었다고 알림
      await act(async () => {
        promiseResolver({ success: true });
      });

      // 최종 상태 체크
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isScrap).toBe(true);
      expect(mockToast).toHaveBeenCalledWith({
        title: '스크랩이 완료되었습니다.',
      });
    });

    test('요청 실패 시 상태가 롤백되어야 한다', async () => {
      let promiseResolver: (value: { success: boolean; status?: number; message?: string }) => void;
      (createScrap as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            promiseResolver = resolve;
          }),
      );

      const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: false }));

      await act(async () => {
        result.current.toggleScrap();
      });

      // 상태 업데이트 체크
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isScrap).toBe(true);

      // 실패 응답으로 Promise 해결
      await act(async () => {
        promiseResolver({ success: false, message: '에러가 발생했습니다.' });
      });

      // 롤백 상태 체크
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isScrap).toBe(false);
      expect(mockToast).toHaveBeenCalledWith({
        title: '에러가 발생했습니다.',
        variant: 'destructive',
      });
    });

    test('401 에러 발생 시 로그인 페이지로 리다이렉트되어야 한다', async () => {
      let promiseResolver: (value: { success: boolean; status?: number; message?: string }) => void;
      (createScrap as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            promiseResolver = resolve;
          }),
      );

      const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: false }));

      await act(async () => {
        result.current.toggleScrap();
      });

      // 초기 상태 업데이트 체크
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isScrap).toBe(true);

      // 401 에러로 Promise 해결
      await act(async () => {
        promiseResolver({ success: false, status: 401, message: '인증이 필요합니다.' });
      });

      // 상태 체크
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isScrap).toBe(false);
      expect(mockPush).toHaveBeenCalledWith(ROUTES.LOGIN);
      expect(mockToast).not.toHaveBeenCalled();
    });
  });

  describe('removeFromScraps', () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({ data: { user: { id: 1 } } });
    });

    test('요청 중에는 로딩 상태가 true가 되고 낙관적 업데이트가 되어야 한다', async () => {
      let promiseResolver: (value: { success: boolean; status?: number; message?: string }) => void;
      (deleteScrap as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            promiseResolver = resolve;
          }),
      );

      const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: true }));

      await act(async () => {
        result.current.toggleScrap();
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isScrap).toBe(false);

      await act(async () => {
        promiseResolver({ success: true });
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isScrap).toBe(false);
      expect(mockToast).toHaveBeenCalledWith({
        title: '스크랩이 취소되었습니다.',
      });
    });

    test('요청 실패 시 상태가 롤백되어야 한다', async () => {
      let promiseResolver: (value: { success: boolean; status?: number; message?: string }) => void;
      (deleteScrap as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            promiseResolver = resolve;
          }),
      );

      const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: true }));

      await act(async () => {
        result.current.toggleScrap();
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isScrap).toBe(false);

      await act(async () => {
        promiseResolver({ success: false, message: '스크랩 취소에 실패했습니다.' });
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isScrap).toBe(true);
      expect(mockToast).toHaveBeenCalledWith({
        title: '스크랩 취소에 실패했습니다.',
        variant: 'destructive',
      });
    });

    test('401 에러 발생 시 로그인 페이지로 리다이렉트되어야 한다', async () => {
      let promiseResolver: (value: { success: boolean; status?: number; message?: string }) => void;
      (deleteScrap as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            promiseResolver = resolve;
          }),
      );

      const { result } = renderHook(() => useRoomScrap({ roomId, initialIsScrap: true }));

      await act(async () => {
        result.current.toggleScrap();
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isScrap).toBe(false);

      await act(async () => {
        promiseResolver({ success: false, status: 401, message: '인증이 필요합니다.' });
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isScrap).toBe(true);
      expect(mockPush).toHaveBeenCalledWith(ROUTES.LOGIN);
      expect(mockToast).not.toHaveBeenCalled();
    });
  });
});
