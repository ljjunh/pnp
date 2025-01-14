'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import GoogleMapView from '@/components/common/Map/GoogleMapView';
import { useLocation } from '@/hooks/useLocation';
import { LOCATION_STEP } from '@/constants/registerStep';
import { FaLocationArrow } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { HiBuildingOffice2 } from 'react-icons/hi2';
import { RegisterContext } from '../../components/RegisterContext';
import { LocationDetail } from '../page';

const mockData = [
  {
    title: '전주',
    location: '대한민국 전북특별자치도',
  },
  { title: '전주집', location: '대한민국 서울특별시 중구 수표로' },
  { title: '전주집', location: '대한민국 서욱특별시 종로구 종로40가길' },
  { title: '전주전집', location: '대한민국 서울특별시 동작구 동작대로7길' },
  { title: '전주옛날집', location: '대한민국 서울 서초구 강남대로' },
];

interface LocationInputProps {
  searchLocation: string;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setSearchLocation: (location: string) => void;
  setLocationDetail: (detail: LocationDetail) => void;
}

export default function LocationInput({
  searchLocation,
  setLatitude,
  setLongitude,
  setSearchLocation,
  setLocationDetail,
}: LocationInputProps) {
  const { setCurrentStep } = useContext(RegisterContext);
  const [isSearchClick, setIsSearchClick] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { location, fetchLocation, isLoading } = useLocation({});

  const selected = 'border-black rounded-2xl';

  const handleSearch = (selectedLocation: string) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: selectedLocation }, (results, status) => {
      if (status === 'OK' && results) {
        const { lat, lng } = results[0].geometry.location;
        setLatitude(lat());
        setLongitude(lng());
        setSearchLocation(selectedLocation);

        // 상세 정보 파싱
        const addressDetail = results[0].address_components;
        const detail: LocationDetail = {
          country: '한국',
          state: '',
          city: '',
          district: '',
          roadAddress: '',
          buildingName: '',
          postalCode: '',
        };

        addressDetail.forEach((component) => {
          const types = component.types;
          if (types.includes('administrative_area_level_1')) {
            detail.state = component.long_name;
          } else if (types.includes('locality')) {
            detail.city = component.long_name;
          } else if (types.includes('sublocality_level_1')) {
            detail.district = component.long_name;
          } else if (types.includes('postal_code')) {
            detail.postalCode = component.long_name;
          } else if (types.includes('route')) {
            detail.roadAddress = component.long_name;
          }
        });

        setLocationDetail(detail);
        setCurrentStep(LOCATION_STEP.CONFIRM);
      }
    });
  };

  const handleCurrentLocation = async () => {
    await fetchLocation();

    setLatitude(location.latitude);
    setLongitude(location.longitude);

    // Promise로 감싸서 비동기 처리
    const geocoder = new google.maps.Geocoder();
    try {
      const response = await new Promise((resolve, reject) => {
        geocoder.geocode(
          { location: { lat: location.latitude, lng: location.longitude } },
          (results, status) => {
            if (status === 'OK' && results) {
              resolve(results);
            } else {
              reject(status);
            }
          },
        );
      });

      const results = response as google.maps.GeocoderResult[];
      if (results[0]) {
        const addressDetail = results[0].address_components;
        const detail: LocationDetail = {
          country: '한국',
          state: '',
          city: '',
          district: '',
          roadAddress: '',
          buildingName: '',
          postalCode: '',
        };

        addressDetail.forEach((component) => {
          const types = component.types;
          if (types.includes('administrative_area_level_1')) {
            detail.state = component.long_name;
          } else if (types.includes('locality')) {
            detail.city = component.long_name;
          } else if (types.includes('sublocality_level_1')) {
            detail.district = component.long_name;
          } else if (types.includes('postal_code')) {
            detail.postalCode = component.long_name;
          } else if (types.includes('route')) {
            detail.roadAddress = component.long_name;
          }
        });

        setLocationDetail(detail);
        setSearchLocation(results[0].formatted_address);
        setCurrentStep(LOCATION_STEP.CONFIRM);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setCurrentStep(LOCATION_STEP.CONFIRM);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsSearchClick(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 여기선 지도에 현재 위치만 띄워주면 됨
  return (
    <div className="flex w-full flex-col">
      <p className="pb-3 text-3xl">숙소 위치는 어디인가요?</p>
      <p className="pb-10 text-lg text-neutral-07">
        주소는 게스트의 예약이 확정된 이후에 공개됩니다.
      </p>
      {isLoading ? (
        <div className="flex h-[480px] w-full items-center justify-center rounded-xl bg-neutral-03">
          <span>현재 위치를 가져오는 중입니다.</span>
        </div>
      ) : (
        <div className="relative">
          <GoogleMapView
            lat={37.5642135} // 초기에는 서울 띄워주기
            lng={127.0016985}
            height="480px"
            zoom={13}
          />
          <div
            className="absolute left-1/2 top-4 w-4/5 -translate-x-1/2"
            ref={wrapperRef}
          >
            <div
              className={cn(
                'z-20 flex w-full space-x-3 rounded-full border-2 border-white bg-white px-6 py-5 transition-all duration-200',
                isSearchClick && selected,
              )}
              onClick={() => setIsSearchClick(true)}
            >
              <FaLocationDot size={30} />
              <input
                type="text"
                placeholder="주소를 입력하세요"
                className="w-full outline-none focus:border-none focus:outline-none focus:ring-0"
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            {isSearchClick && (
              <>
                <div
                  className="w-full cursor-pointer rounded-2xl bg-white p-4 hover:bg-neutral-04"
                  onClick={handleCurrentLocation}
                >
                  <div className="flex items-center space-x-3 hover:bg-neutral-04">
                    <FaLocationArrow
                      className="rounded-full bg-neutral-03 p-2"
                      size={30}
                    />
                    <p>현재 위치 사용</p>
                  </div>
                </div>
                {searchLocation && (
                  <div className="w-full cursor-pointer rounded-2xl bg-white py-4">
                    {mockData.map((data, index) => (
                      <div
                        className="flex flex-row items-center space-x-3 px-4 py-3 hover:bg-neutral-04"
                        key={`${data.title}-${index}`}
                        onClick={() => handleSearch(data.location)}
                      >
                        <HiBuildingOffice2
                          className="rounded-full bg-neutral-03 p-2"
                          size={35}
                        />
                        <div className="flex flex-col">
                          <span>{data.title}</span>
                          <span>{data.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
