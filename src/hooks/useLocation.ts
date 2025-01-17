'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Location {
  latitude: number;
  longitude: number;
}

interface UseLocationProps {
  latitude?: number;
  longitude?: number;
}

export const useLocation = ({ latitude, longitude }: UseLocationProps) => {
  const [location, setLocation] = useState<Location>({
    latitude: 37.5642135,
    longitude: 127.0016985,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (latitude && longitude) {
      // 데이터가 있을 때
      setLocation({
        latitude,
        longitude,
      });
    } else {
      fetchLocation();
    }
  }, []);

  const fetchLocation = async (): Promise<undefined> => {
    try {
      setIsLoading(true);

      // 위치 권한을 거부했을 때
      if (!navigator.geolocation) {
        throw new Error('위치 정보 접근 권한이 거부되었습니다.');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 1000 * 3,
          maximumAge: 1000 * 60 * 60,
          enableHighAccuracy: false,
        });
      });

      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setLocation(newLocation);
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('위치 정보 접근 권한이 거부되었습니다.');
            toast({
              title: '위치 정보 접근 권한이 거부되었습니다.',
              variant: 'destructive',
            });
            break;
          case error.POSITION_UNAVAILABLE:
            setError('위치 정보를 사용할 수 없습니다.');
            toast({
              title: '위치 정보를 사용할 수 없습니다.',
              variant: 'destructive',
            });
            break;
          case error.TIMEOUT:
            toast({
              title: '위치 정보 요청 시간이 초과되었습니다.',
              variant: 'destructive',
            });
            setError('위치 정보 요청 시간이 초과되었습니다.');
            break;
          default:
            toast({
              title: '사용자의 위치를 가져오는 데 실패하였습니다.',
              variant: 'destructive',
            });
            setError('사용자의 위치를 가져오는 데 실패하였습니다.');
        }
      } else {
        setError('사용자의 위치를 가져오는 데 실패하였습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchLocation, location, isLoading, error };
};
