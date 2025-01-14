'use client';

import { useContext, useEffect } from 'react';
import { Switch } from '@radix-ui/react-switch';
import GoogleMapView from '@/components/common/Map/GoogleMapView';
import { LOCATION_STEP } from '@/constants/registerStep';
import { RegisterContext } from '../../components/RegisterContext';
import { LocationDetail } from '../page';

interface LocationConfirmProps {
  latitude?: number;
  longitude?: number;
  locationDetail: LocationDetail;
  setLocationDetail: (location: LocationDetail) => void;
}

export default function LocationConfirm({
  latitude,
  longitude,
  locationDetail,
  setLocationDetail,
}: LocationConfirmProps) {
  const { setCurrentStep } = useContext(RegisterContext);
  console.log('locationDetail', locationDetail);

  useEffect(() => {
    if (!latitude || !longitude) {
      setCurrentStep(LOCATION_STEP.INPUT);
    }
  }, [latitude, longitude, setCurrentStep]);

  const handleInputChange = (field: keyof LocationDetail, value: string) => {
    setLocationDetail({
      ...locationDetail,
      [field]: value,
    });
  };

  return (
    <div className="w-4/5">
      <p className="pb-3 text-3xl">주소 확인</p>
      <p className="pb-10 text-lg text-neutral-07">
        주소는 게스트의 예약이 확정된 이후에 공개됩니다.
      </p>
      <div>
        <input
          type="text"
          className="mb-4 w-full rounded-xl border border-neutral-07 p-3"
          placeholder="한국 - KR"
          disabled
        />
        <input
          type="text"
          className="w-full rounded-t-xl border border-neutral-07 p-3"
          placeholder="도/특별·광역시"
          value={locationDetail.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full border border-neutral-07 p-3"
          placeholder="도시"
          value={locationDetail.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
        />
        <input
          type="text"
          className="w-full border border-neutral-07 p-3"
          placeholder="군/구(해당하는 경우)"
          value={locationDetail.district}
          onChange={(e) => handleInputChange('district', e.target.value)}
        />
        <input
          type="text"
          className="w-full border border-neutral-07 p-3"
          placeholder="도로명 주소"
          value={locationDetail.roadAddress}
          onChange={(e) => handleInputChange('roadAddress', e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full border border-neutral-07 p-3"
          placeholder="아파트 층수/호수, 건물명(해당하는 경우)"
          value={locationDetail.buildingName}
          onChange={(e) => handleInputChange('buildingName', e.target.value)}
        />
        <input
          type="text"
          className="w-full rounded-b-xl border border-neutral-07 p-3"
          placeholder="우편번호(해당하는 경우)"
          value={locationDetail.postalCode}
          onChange={(e) => handleInputChange('postalCode', e.target.value)}
        />
      </div>

      <hr className="my-10" />

      <div className="mb-4 flex flex-row justify-between">
        <div>
          <span>구체적인 위치 표시하기</span>
          <p className="text-neutral-07">
            게스트에게 숙소 위치를 구체적으로 알려주실 수 있습니다. 숙소 주소는 예약이 확정된 후에
            공개됩니다.
            <span className="border-b border-neutral-07">자세히 알아보기</span>
          </p>
        </div>
        <Switch />
      </div>

      <GoogleMapView
        lat={latitude || 37.5642135}
        lng={longitude || 127.0016985}
        height="250px"
        zoom={13}
      />
    </div>
  );
}
