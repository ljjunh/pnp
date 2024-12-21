import { useJsApiLoader } from '@react-google-maps/api';

interface UseGoogleMapsReturn {
  isLoaded: boolean;
}

/**
 * Google Maps API를 초기화하고 로드하는 커스텀 훅
 *
 * @description
 * 환경 변수에 설정된 Google Maps API 키를 사용하여
 * Google Maps JavaScript API를 로드하고 초기화
 *
 * @requires
 * - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 환경 변수 설정 필요
 *
 * @returns {UseGoogleMapsReturn} Google Maps API 로드 상태
 * @returns {boolean} isLoaded - API 로드 완료 여부를 나타내는 불리언 값
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { isLoaded } = useGoogleMaps();
 *
 *   if (!isLoaded) return <div>Loading...</div>;
 *
 *   return <GoogleMap />;
 * }
 * ```
 */
export const useGoogleMaps = (): UseGoogleMapsReturn => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  return { isLoaded };
};
