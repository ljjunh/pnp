import RoomCardCarousel from '@/components/common/Card/RoomCardCarousel';
import { BsHouseExclamation } from 'react-icons/bs';

const images = [
  '/images/05.avif',
  '/images/02.avif',
  '/images/04.avif',
  '/images/01.avif',
  '/images/03.avif',
  '/images/06.avif',
];

export function RoomInformation() {
  return (
    <>
      <div className="flex flex-col gap-5 px-4 pt-4">
        <h1 className="text-2xl font-medium">호스트 이름의 숙소</h1>
        <RoomCardCarousel images={images} />
        <div className="flex flex-col gap-1">
          <h3 className="font-bold">예약이 종료 되었습니다.</h3>
          <p>
            여행 중 발생한 문제로 인해 상대방에게 금액을 지급하거나 요청해야 할 경우, 해결 센터를
            이용하시기 바랍니다.
          </p>
        </div>
        <button className="rounded-xl border border-black py-3 hover:bg-gray-100">
          지급 또는 결제 요청
        </button>
        <hr />
        <div className="flex justify-between text-gray-500">
          <div className="flex-1 border-r">
            <p className="text-black">체크인</p>
            <p>1월 11일 (화)</p>
            <p>오후 4:00</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-black">체크아웃</p>
            <p>1월 13일 (목)</p>
            <p>오전 11:00</p>
          </div>
        </div>
        <hr />
      </div>

      {/* onClick 숙소 상세 페이지로 */}
      <button>
        <div className="flex gap-3 px-4 py-4 hover:bg-gray-100">
          <BsHouseExclamation className="size-8" />
          <div className="flex flex-col text-left">
            <h1 className="font-medium">숙소</h1>
            <p className="line-clamp-1 text-xs text-gray-500">
              고색역 도보 5분 넷플릭스 웨이브 쿠팡플레이 티빙 디지니플러스
            </p>
          </div>
        </div>
      </button>
    </>
  );
}
