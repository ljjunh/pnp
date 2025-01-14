import GoogleMapView from '@/components/common/Map/GoogleMapView';
import { FaLocationDot } from 'react-icons/fa6';
import { LocationDetail } from '../page';

interface LocationInputProps {
  latitude?: number;
  longitude?: number;
  locationDetail: LocationDetail;
}

export default function LocationCheck({ latitude, longitude, locationDetail }: LocationInputProps) {
  const formatLocation = `${locationDetail.city} ${locationDetail.district} ${locationDetail.roadAddress} ${locationDetail.buildingName}`;

  return (
    <div className="flex w-full flex-col">
      <input
        type="hidden"
        name="location"
        value={formatLocation}
      />
      <input
        type="hidden"
        name="latitude"
        value={latitude}
      />
      <input
        type="hidden"
        name="longitude"
        value={longitude}
      />
      <p className="pb-3 text-3xl">핀이 놓인 위치가 정확한가요?</p>
      <p className="pb-10 text-lg text-neutral-07">
        주소는 게스트의 예약이 확정된 후에만 공개됩니다.
      </p>
      <div className="relative">
        <GoogleMapView
          lat={latitude || 37.5642135}
          lng={longitude || 127.0016985}
          height="480px"
          zoom={13}
        />
        <div className="absolute left-1/2 top-4 z-20 flex w-4/5 -translate-x-1/2 space-x-3 rounded-full border-2 border-white bg-white px-6 py-5 transition-all duration-200">
          <FaLocationDot size={30} />
          <input
            type="text"
            placeholder={formatLocation}
            className="w-full bg-white placeholder-black outline-none focus:border-none focus:outline-none focus:ring-0"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
