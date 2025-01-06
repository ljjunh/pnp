import { ImageLink } from '@/types/room';
import RoomCardCarousel from '@/components/common/Card/RoomCardCarousel';
import { BsHouseExclamation } from 'react-icons/bs';
import { BiMessage } from "react-icons/bi";

const images: ImageLink[] = [
  { id: 1, imageLink: '/images/03.avif', orientation: 'LANDSCAPE' },
  { id: 2, imageLink: '/images/02.avif', orientation: 'PORTRAIT' },
  { id: 3, imageLink: '/images/01.avif', orientation: 'LANDSCAPE' },
  { id: 4, imageLink: '/images/06.avif', orientation: 'PORTRAIT' },
  { id: 5, imageLink: '/images/05.avif', orientation: 'LANDSCAPE' },
  { id: 6, imageLink: '/images/04.avif', orientation: 'PORTRAIT' },
];

export function TripRoomInformation() {
  return (
    <>
      <div className="flex flex-col gap-5 px-4 pt-4">
        <h1 className="text-2xl font-medium">호스트 이름의 숙소</h1>
        <RoomCardCarousel images={images} />
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
          <BiMessage className="size-6" />
          <div className="flex flex-col text-left">
            <h1 className="font-medium">호스트에게 메시지 보내기</h1>
            <p className="line-clamp-1 text-xs text-gray-500">
              호스트 이름
            </p>
          </div>
        </div>
      </button>

      <button>
        <div className="flex gap-3 px-4 py-4 hover:bg-gray-100">
          <BsHouseExclamation className="size-6" />
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
