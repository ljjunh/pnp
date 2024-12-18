'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useGoogleMaps } from '@/hooks/useGoogleMap';

interface MapProps {
  lat: number;
  lng: number;
  height?: string;
  width?: string;
  zoom?: number;
}

export default function GoogleMapView({
  lat,
  lng,
  height = '480px',
  width = '100%',
  zoom = 15,
}: MapProps) {
  const { isLoaded } = useGoogleMaps();

  if (!isLoaded) return <Skeleton className="h-[480px] w-full rounded-xl" />;
  return (
    <GoogleMap
      zoom={zoom}
      center={{ lat, lng }}
      mapContainerStyle={{
        width,
        height,
        borderRadius: '0.5rem',
      }}
    >
      <Marker
        position={{ lat, lng }}
        icon={{
          url: '/images/locationMarker.svg',
          scaledSize: new google.maps.Size(40, 44),
          anchor: new google.maps.Point(20, 44),
        }}
      ></Marker>
    </GoogleMap>
  );
}
