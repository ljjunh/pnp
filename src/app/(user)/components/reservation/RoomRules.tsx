import { RoomRulesDetailModalButton } from '@/app/(user)/components/reservation/RoomRulesDetailModalButton';
import { Room } from '@/types/room';
import { BsHouseExclamation } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';

interface RoomRulesProps {
  checkInType: Room['checkInType'];
  checkIn: Room['checkIn'];
  checkOut: Room['checkOut'];
  rules: Room['rules'];
}

export function RoomRules({ checkInType, checkIn, checkOut, rules }: RoomRulesProps) {
  return (
    <div className="flex flex-col gap-5 px-4">
      <h2 className="text-xl font-medium">숙소 이용 규칙 및 안내</h2>
      <div>
        <h3 className="font-bold">숙소 이용규칙</h3>
        {checkInType && <p>체크인: {checkInType}</p>}
        {rules.slice(0, 2).map((rule) => (
          <p key={rule.id}>{rule.title}</p>
        ))}
        <RoomRulesDetailModalButton
          checkInType={checkInType}
          checkIn={checkIn}
          checkOut={checkOut}
          rules={rules}
        />
      </div>
      <div className="-mx-4 px-4 hover:bg-gray-100">
        <hr />
        <button
          className="w-full py-3"
          aria-label="숙소 상세 보기"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BsHouseExclamation />
              <p>숙소 보기</p>
            </div>
            <IoIosArrowForward />
          </div>
        </button>
      </div>
    </div>
  );
}
