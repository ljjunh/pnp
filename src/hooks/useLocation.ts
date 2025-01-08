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
        throw new Error('사용자의 위치를 가져오는 데 실패하였습니다.');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.error(error);
      setError('사용자의 위치를 가져오는 데 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initLocation();
  }, []);

  return { location, isLoading, error };
};
