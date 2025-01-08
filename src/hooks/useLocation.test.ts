import { act, renderHook } from '@testing-library/react';
import { useLocation } from '@/hooks/useLocation';

describe('useLocation test', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearPosition: jest.fn(),
  };

  const mockLocation = {
    coords: {
      latitude: 37.5665,
      longitude: 126.978,
    },
  };

  beforeEach(() => {
    // navigator.geolocation mock 설정
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
      writable: true,
    });

    jest.clearAllMocks();
  });

  test('위치가 prop으로 전달되었을 때, location은 prop으로 전달된 값이어야 한다.', async () => {
    const { result } = renderHook(() => useLocation({ latitude: 37.5665, longitude: 126.978 }));

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(result.current.location).toEqual({
      latitude: 37.5665,
      longitude: 126.978,
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    // getCurrentPosition이 호출되지 않았는지 확인
    expect(mockGeolocation.getCurrentPosition).not.toHaveBeenCalled();
  });

  test('사용자의 위치를 성공적으로 가져와야 한다.', async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success) => success(mockLocation));

    const { result } = renderHook(() => useLocation({}));

    // 위치를 가져오기 전의 상태 확인
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.location).toBeUndefined();

    // 위치 가져오기
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // 위치를 가져오고 난 후의 상태 확인
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.location).toEqual({
      latitude: mockLocation.coords.latitude,
      longitude: mockLocation.coords.longitude,
    });
  });

  test('사용자의 위치를 가져오는 것을 실패하면 에러 메시지를 반환해야 한다.', async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((_, error) =>
      error(new Error('사용자의 위치를 가져오는 데 실패하였습니다.')),
    );

    const { result } = renderHook(() => useLocation({}));

    // 위치 가져오기
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // 위치를 가져오고 난 후의 상태 확인
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('사용자의 위치를 가져오는 데 실패하였습니다.');
    expect(result.current.location).toBeUndefined();
  });

  test('사용자가 위치 권한을 거부하면 에러 메시지를 반환해야 한다.', async () => {
    // 실제와 같은 에러 객체 생성
    const permissionDeniedError = {
      code: 1, // PERMISSION_DENIED
      message: 'User denied Geolocation',
    };

    // 위치 권한 거부 에러 발생
    mockGeolocation.getCurrentPosition.mockImplementation((_, error) =>
      error(permissionDeniedError),
    );

    const { result } = renderHook(() => useLocation({}));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('사용자의 위치를 가져오는 데 실패하였습니다.');
    expect(result.current.location).toBeUndefined();
  });

  test('geolocation API를 지원하지 않는 환경에서 에러 메시지를 반환해야 한다.', () => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      writable: true,
    });

    const { result } = renderHook(() => useLocation({}));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('사용자의 위치를 가져오는 데 실패하였습니다.');
    expect(result.current.location).toBeUndefined();
  });
});
