'use client';

import GoogleMapView from '@/components/common/Map/GoogleMapView';
import { useLocation } from '@/hooks/useLocation';

interface SearchResultLocationProps {
  latitude?: number;
  longitude?: number;
}

export default function SearchResultLocation({ latitude, longitude }: SearchResultLocationProps) {
  const { location, isLoading, error } = useLocation({ latitude, longitude });

  if (isLoading) {
    return (
      <div className="flex h-[750px] items-center justify-center rounded-xl bg-neutral-03">
        <p>위치를 가져오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[750px] items-center justify-center rounded-xl bg-neutral-03">
        <p>{error}</p>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex h-[750px] items-center justify-center rounded-xl bg-neutral-03">
        <p>위치를 가져오는 데 실패하였습니다.</p>
      </div>
    );
  }

  return (
    <GoogleMapView
      lat={location.latitude}
      lng={location.longitude}
      height="750px"
      zoom={12}
    />
  );
}
