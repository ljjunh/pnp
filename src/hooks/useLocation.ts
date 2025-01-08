'use client';

import { useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface UseLocationProps {
  latitude?: number;
  longitude?: number;
}

export const useLocation = ({ latitude, longitude }: UseLocationProps) => {
  const [location, setLocation] = useState<Location>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initLocation = async () => {
    try {
      // 데이터가 있을 때
      if (latitude && longitude) {
        setLocation({
          latitude,
          longitude,
        });

        return;
      }

      // 위치 권한을 거부했을 때
      if (!navigator.geolocation) {
        throw new Error('위치 정보 접근 권한이 거부되었습니다.');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 5000,
          enableHighAccuracy: false,
        });
      });

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('위치 정보 접근 권한이 거부되었습니다.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('위치 정보를 사용할 수 없습니다.');
            break;
          case error.TIMEOUT:
            setError('위치 정보 요청 시간이 초과되었습니다.');
            break;
          default:
            setError('사용자의 위치를 가져오는 데 실패하였습니다.');
        }
      } else {
        setError('사용자의 위치를 가져오는 데 실패하였습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initLocation();
  }, [latitude, longitude]);

  return { location, isLoading, error };
};
