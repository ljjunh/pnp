import { useJsApiLoader } from '@react-google-maps/api';

interface UseGoogleMapsReturn {
  isLoaded: boolean;
}

export const useGoogleMaps = (): UseGoogleMapsReturn => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  return { isLoaded };
};
