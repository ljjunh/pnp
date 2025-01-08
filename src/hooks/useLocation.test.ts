import { act, renderHook } from '@testing-library/react';
import { useLocation } from '@/hooks/useLocation';
import { CustomGeolocationPositionError } from '../../jest/frontend.setup';

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
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
      writable: true,
    });
    jest.clearAllMocks();
  });

  test('위치가 prop으로 전달되었을 때, location은 prop으로 전달된 값이어야 한다.', async () => {
    const { result } = renderHook(() => useLocation({ latitude: 37.5665, longitude: 126.978 }));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current.location).toEqual({
      latitude: 37.5665,
      longitude: 126.978,
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(mockGeolocation.getCurrentPosition).not.toHaveBeenCalled();
  });

  test('사용자의 위치를 성공적으로 가져와야 한다.', async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success) => success(mockLocation));

    const { result } = renderHook(() => useLocation({}));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.location).toBeUndefined();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.location).toEqual({
      latitude: mockLocation.coords.latitude,
      longitude: mockLocation.coords.longitude,
    });
  });

  test('geolocation이 지원되지 않는 경우 에러를 반환해야 한다', async () => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      writable: true,
    });

    const { result } = renderHook(() => useLocation({}));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current.error).toBe('사용자의 위치를 가져오는 데 실패하였습니다.');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.location).toBeUndefined();
  });

  test('위치 권한이 거부된 경우 적절한 에러 메시지를 반환해야 한다', async () => {
    const positionPermissionError = new CustomGeolocationPositionError(
      GeolocationPositionError.PERMISSION_DENIED,
    );

    mockGeolocation.getCurrentPosition.mockImplementation((_, errorCallback) =>
      errorCallback(positionPermissionError),
    );

    const { result } = renderHook(() => useLocation({}));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current.error).toBe('위치 정보 접근 권한이 거부되었습니다.');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.location).toBeUndefined();
  });

  test('위치 정보를 사용할 수 없는 경우 적절한 에러 메시지를 반환해야 한다', async () => {
    const positionUnavailableError = new CustomGeolocationPositionError(
      GeolocationPositionError.POSITION_UNAVAILABLE,
    );

    mockGeolocation.getCurrentPosition.mockImplementation((_, errorCallback) =>
      errorCallback(positionUnavailableError),
    );

    const { result } = renderHook(() => useLocation({}));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current.error).toBe('위치 정보를 사용할 수 없습니다.');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.location).toBeUndefined();
  });

  test('위치 정보 요청이 타임아웃된 경우 적절한 에러 메시지를 반환해야 한다', async () => {
    const timeOutError = new CustomGeolocationPositionError(GeolocationPositionError.TIMEOUT);

    mockGeolocation.getCurrentPosition.mockImplementation((_, errorCallback) =>
      errorCallback(timeOutError),
    );

    const { result } = renderHook(() => useLocation({}));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current.error).toBe('위치 정보 요청 시간이 초과되었습니다.');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.location).toBeUndefined();
  });

  test('알 수 없는 에러가 발생한 경우 기본 에러 메시지를 반환해야 한다', async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((_, errorCallback) =>
      errorCallback(new Error('Unknown error')),
    );

    const { result } = renderHook(() => useLocation({}));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(result.current.error).toBe('사용자의 위치를 가져오는 데 실패하였습니다.');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.location).toBeUndefined();
  });
});
