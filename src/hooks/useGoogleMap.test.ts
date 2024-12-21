import { useJsApiLoader } from '@react-google-maps/api';
import { renderHook } from '@testing-library/react';
import { useGoogleMaps } from '@/hooks/useGoogleMap';

// @react-google-maps/api 모듈 모킹
jest.mock('@react-google-maps/api', () => ({
  useJsApiLoader: jest.fn(),
}));

describe('useGoogleMaps 테스트', () => {
  // 원본 환경변수 저장
  const originalEnv = process.env;

  beforeEach(() => {
    // 각 테스트 전에 목 초기화
    jest.clearAllMocks();
    // 각 테스트 전에 환경변수를 원본의 복사본으로 초기화
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // 각 테스트 후에 원본 환경변수로 복구
    process.env = originalEnv;
  });

  test('구글 맵 API가 로드되었을 때 isLoaded가 true를 반환한다', () => {
    // useJsApiLoader가 isLoaded: true를 반환하도록 설정
    (useJsApiLoader as jest.Mock).mockReturnValue({ isLoaded: true });

    // 훅은 컴포넌트안에서만 호출 가능해서, renderHook이 테스트를 위한 임시컴포넌트 만들어서 그안에서 훅을 실행해줌
    const { result } = renderHook(() => useGoogleMaps());

    // useJsApiLoader가 정확한 API 키와 함께 호출되었는지 확인
    expect(useJsApiLoader).toHaveBeenCalledWith({
      googleMapsApiKey: 'test-api-key',
    });
    // 훅이 isLoaded: true를 반환하는지 확인
    expect(result.current.isLoaded).toBe(true);
  });

  test('구글 맵 API가 로드되지 않았을 때 isLoaded가 false를 반환한다', () => {
    // useJsApiLoader가 isLoaded: false를 반환하도록 설정
    (useJsApiLoader as jest.Mock).mockReturnValue({ isLoaded: false });

    const { result } = renderHook(() => useGoogleMaps());
    // useJsApiLoader가 정확한 API 키와 함께 호출되었는지 확인
    expect(useJsApiLoader).toHaveBeenCalledWith({
      googleMapsApiKey: 'test-api-key',
    });
    // 훅이 isLoaded: false를 반환하는지 확인
    expect(result.current.isLoaded).toBe(false);
  });

  test('환경변수에서 API 키를 올바르게 가져온다', () => {
    (useJsApiLoader as jest.Mock).mockReturnValue({ isLoaded: true });

    renderHook(() => useGoogleMaps());

    // 환경변수에 설정된 'test-api-key' 값이 전달되었는지 확인
    expect(useJsApiLoader).toHaveBeenCalledWith({
      googleMapsApiKey: 'test-api-key',
    });
  });

  test('환경변수가 없으면 빈 문자열로 대체한다', () => {
    // 환경변수에서 API 키 제거
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    (useJsApiLoader as jest.Mock).mockReturnValue({ isLoaded: true });

    renderHook(() => useGoogleMaps());

    // API 키가 없을 때 빈 문자열이 전달되는지 확인
    expect(useJsApiLoader).toHaveBeenCalledWith({
      googleMapsApiKey: '',
    });
  });
});
