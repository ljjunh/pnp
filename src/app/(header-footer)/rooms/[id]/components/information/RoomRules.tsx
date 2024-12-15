import Link from 'next/link';
import { Room } from '@/types/room';
import { ROUTES } from '@/constants/routeURL';
import { IoIosArrowForward } from 'react-icons/io';

interface RoomRulesProps {
  id: string;
  checkIn: Room['checkIn'];
  checkOut: Room['checkOut'];
  rules: Room['rules'];
}

export default function RoomRules({ id, checkIn, checkOut, rules }: RoomRulesProps) {
  return (
    <div className="py-12">
      <h2 className="pb-6 text-2xl">알아두어야 할 사항</h2>
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex flex-col">
          <span className="pb-3">숙소 이용 규칙</span>
          <span className="pb-4 text-shade-02">체크인 가능 시간: {checkIn} 이후</span>
          <span className="pb-4 text-shade-02">체크아웃 시간: {checkOut} 전까지</span>
          <span className="pb-4 text-shade-02">{rules[0].title}</span>
          <Link
            href={ROUTES.ROOMS.HOUSE_RULES(id)}
            className="flex items-center text-shade-02 underline hover:text-black"
          >
            더 보기
            <IoIosArrowForward size={19} />
          </Link>
        </div>
        <div className="col-span-1 flex flex-col">
          <span className="pb-3">안전 및 숙소</span>
          <span className="pb-4 text-shade-02">일산화탄소 경보기 없음</span>
          <span className="pb-4 text-shade-02">화재경보기 없음</span>
          <span className="pb-4 text-shade-02">출입이 제한되지 않는 수영장/대형욕조</span>
          <Link
            href={ROUTES.ROOMS.SAFETY(id)}
            className="flex items-center text-shade-02 underline hover:text-black"
          >
            더 보기
            <IoIosArrowForward size={19} />
          </Link>
        </div>
        <div className="col-span-1 flex flex-col">
          <span className="pb-3">환불 정책</span>
          <span className="pb-4 text-shade-02">
            3월 5일 전까지 무료 취소가 가능합니다. 4월 5일 체크인 전에 취소하면 부분 환불을 받으실
            수 있습니다.
          </span>
          <span className="pb-4 text-shade-02">
            자세한 내용은 호스트의 환불 정책 전문을 참고하세요.
          </span>
          <Link
            href={ROUTES.ROOMS.CANCELLATION(id)}
            className="flex items-center text-shade-02 underline hover:text-black"
          >
            더 보기
            <IoIosArrowForward size={19} />
          </Link>
        </div>
      </div>
    </div>
  );
}
