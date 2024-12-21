import RoomCardCarousel from '@/components/common/Card/RoomCardCarousel';
import { BsHouseExclamation } from 'react-icons/bs';
import { FaAirbnb, FaUserCircle } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosHelpCircle } from 'react-icons/io';
import { TbWorld } from 'react-icons/tb';
import { TbReceiptFilled } from 'react-icons/tb';

interface ReservationInfoProps {
  showReservation: boolean;
  onToggleReservation: () => void;
}

const images = [
  '/images/05.avif',
  '/images/02.avif',
  '/images/04.avif',
  '/images/01.avif',
  '/images/03.avif',
  '/images/06.avif',
];

export function ReservationInfo({ showReservation, onToggleReservation }: ReservationInfoProps) {
  return (
    <section
      className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
        showReservation ? 'w-1/4 opacity-100' : 'w-0 opacity-0'
      }`}
    >
      <div className="flex h-20 items-center justify-between border-b px-8 py-6">
        <h1 className="text-2xl font-medium">예약</h1>
        <button
          className="cursor-pointer rounded-full bg-gray-100 px-3 py-1"
          onClick={onToggleReservation}
        >
          X
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-scroll px-2">
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
              <p className="text-black">체크인</p>
              <p>1월 11일 (화)</p>
              <p>오후 4:00</p>
            </div>
          </div>
          <hr />
          {/* onClick 숙소 상세 페이지로 */}
        </div>
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
        <div className="border-b-8" />
        <div className="flex flex-col gap-5 px-4">
          <h1 className="text-xl font-medium">예약 세부정보</h1>
          <div>
            <h2 className="font-semibold">게스트</h2>
            <p>게스트 1명</p>
          </div>
          <hr />
          <div>
            <h2 className="font-semibold">예약 번호</h2>
            <p>HM9DZBXA8R</p>
          </div>
          <hr />
          <div>
            <h2 className="font-semibold">환불 정책</h2>
            <p>체크인 시간인 1월 11일 오후 12:00 전에 취소하면 부분 환불을 받으실 수 있습니다. 그 이후에는 취소 시점에 따라 환불액이 결정됩니다.</p>
            <p className="cursor-pointer underline">자세히 알아보기</p>
          </div>
          <div>
            <div className="-mx-4 px-4 hover:bg-gray-100">
              <hr />
              <button className="w-full py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TbWorld />
                    <p>여행 일정표 PDF로 받기</p>
                  </div>
                  <IoIosArrowForward />
                </div>
              </button>

              <hr />
            </div>
            <div className="-mx-4 px-4 hover:bg-gray-100">
              <button className="w-full py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TbReceiptFilled />
                    <p>영수증 받기</p>
                  </div>
                  <IoIosArrowForward />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="border-b-8" />
        <div className="flex flex-col gap-5 px-4">
          <h2 className="text-xl font-medium">숙소 이용 규칙 및 안내</h2>
          <div>
            <h3 className="font-bold">숙소 이용규칙</h3>
            <p>셀프 체크인:스마트 도어록</p>
            <p>게스트 정원 1명</p>
            <p>반려동물 동반 불가</p>
            <p className="cursor-pointer underline">더 보기</p>
          </div>
          <div className="-mx-4 px-4 hover:bg-gray-100">
            <hr />
            <button className="w-full py-3">
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

        <div className="border-b-8" />
        <div className="flex flex-col gap-5 px-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">호스트: 호스트 이름</h2>
            <FaUserCircle
              size={52}
              className="text-gray-500"
            />
          </div>
          <p className="cursor-pointer underline">더 보기</p>
        </div>

        <div className="border-b-8" />
        <div className="flex flex-col gap-5 px-4">
          <h2 className="text-xl font-semibold">결제 정보</h2>
          <div>
            <h3 className="font-bold">결제한 금액</h3>
            <p>₩207,953.00</p>
          </div>
          <div className="-mx-4 px-4 hover:bg-gray-100">
            <hr />
            <button className="w-full py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TbReceiptFilled />

                  <p>영수증 받기</p>
                </div>
                <IoIosArrowForward />
              </div>
            </button>
          </div>
        </div>

        <div className="border-b-8" />
        <div className="flex flex-col gap-2 px-4 pb-5 pt-3">
          <div>
            <h2 className="text-xl font-medium">언제든 도움을 받으세요</h2>
            <p className="text-sm">
              도움이 필요하세요? 전 세계 어디서든 연중무휴로 지원해드립니다.
            </p>
          </div>
          <div>
            <div className="-mx-4 px-4 hover:bg-gray-100">
              <button className="w-full py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaAirbnb />
                    <p>에어비앤비 고객지원 팀에 연락하기</p>
                  </div>
                  <IoIosArrowForward />
                </div>
              </button>
              <hr />
            </div>
            <div className="-mx-4 px-4 hover:bg-gray-100">
              <button className="w-full py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IoIosHelpCircle />
                    <p>도움말 센터 방문하기</p>
                  </div>
                  <IoIosArrowForward />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
