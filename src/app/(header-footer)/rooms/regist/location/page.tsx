'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import GoogleMapView from '@/components/common/Map/GoogleMapView';
import { Switch } from '@/components/ui/switch';
import { FaLocationArrow, FaLocationDot } from 'react-icons/fa6';
import { HiBuildingOffice2 } from 'react-icons/hi2';

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

enum LocationStep {
  'INPUT',
  'CONFIRM',
}

export default function Location() {
  const [step, setStep] = useState(LocationStep.CONFIRM);
  const [isClick, setIsClick] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = 'border-black rounded-2xl';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsClick(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="py-11">
      {step === LocationStep.INPUT && (
        <>
          <p className="pb-3 text-3xl">숙소 위치는 어디인가요?</p>
          <p className="pb-10 text-lg text-neutral-07">
            주소는 게스트의 예약이 확정된 이후에 공개됩니다.
          </p>
          <div className="relative">
            <GoogleMapView
              lat={37.5642135}
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
                  isClick && selected,
                )}
                onClick={() => setIsClick(true)}
              >
                <FaLocationDot size={30} />
                <input
                  type="text"
                  placeholder="주소를 입력하세요"
                  className="w-full outline-none focus:border-none focus:outline-none focus:ring-0"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              {isClick && (
                <>
                  {text ? (
                    <div className="w-full cursor-pointer rounded-2xl bg-white py-4">
                      {mockData.map((data, index) => (
                        <div
                          className="flex flex-row items-center space-x-3 px-4 py-3 hover:bg-neutral-04"
                          key={`${data.title}-${index}`}
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
                  ) : (
                    <div className="w-full cursor-pointer rounded-2xl bg-white p-4 hover:bg-neutral-04">
                      <div className="flex items-center space-x-3 hover:bg-neutral-04">
                        <FaLocationArrow
                          className="rounded-full bg-neutral-03 p-2"
                          size={30}
                        />
                        <p>현재 위치 사용</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
      {step === LocationStep.CONFIRM && (
        <div className="w-3/5">
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
            />
            <input
              type="text"
              className="w-full border border-neutral-07 p-3"
              placeholder="도시(해당하는 경우)"
            />
            <input
              type="text"
              className="w-full border border-neutral-07 p-3"
              placeholder="군/구(해당하는 경우)"
            />
            <input
              type="text"
              className="w-full border border-neutral-07 p-3"
              placeholder="도로명 주소"
            />
            <input
              type="text"
              className="w-full border border-neutral-07 p-3"
              placeholder="아파트 층수/호수, 건물명(해당하는 경우)"
            />
            <input
              type="text"
              className="w-full rounded-b-xl border border-neutral-07 p-3"
              placeholder="우편번호(해당하는 경우)"
            />
          </div>

          <hr className="my-10" />

          <div className="mb-4 flex flex-row justify-between">
            <div>
              <span>구체적인 위치 표시하기</span>
              <p className="text-neutral-07">
                게스트에게 숙소 위치를 구체적으로 알려주실 수 있습니다. 숙소 주소는 예약이 확정된
                후에 공개됩니다.
                <span className="border-b border-neutral-07">자세히 알아보기</span>
              </p>
            </div>
            <Switch />
          </div>

          <GoogleMapView
            lat={37.5642135}
            lng={127.0016985}
            height="250px"
            zoom={13}
          />
        </div>
      )}
    </div>
  );
}
