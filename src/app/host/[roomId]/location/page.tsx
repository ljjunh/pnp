'use client';

import { useContext, useEffect, useState } from 'react';
import { RegisterContext } from '@/app/host/[roomId]/components/RegisterContext';
import LocationCheck from '@/app/host/[roomId]/location/components/LocationCheck';
import LocationConfirm from '@/app/host/[roomId]/location/components/LocationConfirm';
import LocationInput from '@/app/host/[roomId]/location/components/LocationInput';
import { useRoomStore } from '@/store/useRoomStore';
import { LOCATION_STEP } from '@/constants/registerStep';

export interface LocationDetail {
  country: string;
  state: string;
  city: string;
  district: string;
  roadAddress: string;
  buildingName: string;
  postalCode: string;
}

export default function Location() {
  const { currentStep, setIsInnerStep, setCurrentStep } = useContext(RegisterContext);
  const { room } = useRoomStore();
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(room?.latitude || 37.5665); // 초기값: 서울
  const [longitude, setLongitude] = useState<number>(room?.longitude || 126.978);
  const [locationDetail, setLocationDetail] = useState<LocationDetail>({
    country: '한국',
    state: '',
    city: '',
    district: '',
    roadAddress: '',
    buildingName: '',
    postalCode: '',
  });

  useEffect(() => {
    if (!currentStep) {
      setIsInnerStep(true);
      setCurrentStep(LOCATION_STEP.INPUT);
    }
  }, [currentStep, setIsInnerStep, setCurrentStep]);

  useEffect(() => {
    return () => {
      setIsInnerStep(false);
      setCurrentStep(undefined);
    };
  }, [setIsInnerStep, setCurrentStep]);

  return (
    <div className="flex h-full items-center justify-center px-40 py-11">
      <input
        type="hidden"
        name="step"
        value="location"
      />
      {currentStep === LOCATION_STEP.INPUT && (
        <LocationInput
          searchLocation={searchLocation}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setSearchLocation={setSearchLocation}
          setLocationDetail={setLocationDetail}
        />
      )}
      {currentStep === LOCATION_STEP.CONFIRM && (
        <LocationConfirm
          latitude={latitude}
          longitude={longitude}
          locationDetail={locationDetail}
          setLocationDetail={setLocationDetail}
        />
      )}
      {currentStep === LOCATION_STEP.LOCATION_CHECK && (
        <LocationCheck
          latitude={latitude}
          longitude={longitude}
          locationDetail={locationDetail}
        />
      )}
    </div>
  );
}
