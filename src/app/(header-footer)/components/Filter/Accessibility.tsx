import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CheckList from './CheckList';

export default function Accessibility() {
  const [open, setOpen] = useState<boolean>(false);
  
  return (
    <div className="space-y-6 px-6 py-8">
      <div
        className="flex cursor-pointer items-center justify-between pb-4"
        onClick={() => setOpen(!open)}
        data-testid="accessibility"
      >
        <span className="text-lg font-semibold">접근성 편의</span>
        {open ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
      </div>
      {open && (
        <>
          <div className="space-y-3">
            <span className="text-base font-semibold">게스트 출입구 및 주차장</span>
            <div className="space-y-4">
              <CheckList title="게스트 출입구에 계단이나 문턱 없음" />
              <CheckList title="너비 81cm 이상의 게스트 출입구" />
              <CheckList title="장애인용 주차 공간" />
              <CheckList title="게스트 출입구까지 계단 없음" />
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-base font-semibold">침실</span>
            <div className="space-y-4">
              <CheckList title="계단이나 문턱 없는 침실" />
              <CheckList title="너비 81cm 이상의 침실 출입구" />
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-base font-semibold">욕실</span>
            <div className="space-y-4">
              <CheckList title="계단이나 문턱 없는 욕실" />
              <CheckList title="너비 81cm 이상의 욕실 출입구" />
              <CheckList title="변기 옆 고정 손잡이" />
              <CheckList title="샤워실 고정 손잡이" />
              <CheckList title="계단이나 문턱 없는 샤워실" />
              <CheckList title="샤워/목욕 의자" />
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-base font-semibold">장애인용 보조 장치</span>
            <div className="space-y-4">
              <CheckList title="천장형 또는 이동식 리프트" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
