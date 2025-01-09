import { RefundDetailModalButton } from '@/app/(user)/components/reservation/RefundDetailModalButton';
import { Reservation } from '@/types/reservation';
import { IoIosArrowForward } from 'react-icons/io';
import { TbWorld } from 'react-icons/tb';
import { TbReceiptFilled } from 'react-icons/tb';

interface ReservationDetailInformationProps {
  guestNumber: Reservation['guestNumber'];
  orderNumber: Reservation['orderNumber'];
  checkIn: string;
  checkOut: string;
}

export function ReservationDetailInformation({
  guestNumber,
  orderNumber,
  checkIn,
  checkOut,
}: ReservationDetailInformationProps) {
  return (
    <div className="flex flex-col gap-5 px-4">
      <h1 className="text-xl font-medium">예약 세부정보</h1>
      <div>
        <h2 className="font-semibold">게스트</h2>
        <p>게스트 {guestNumber}명</p>
      </div>
      <hr />
      <div>
        <h2 className="font-semibold">예약 번호</h2>
        <p>{orderNumber}</p>
      </div>
      <hr />
      <div>
        <h2 className="font-semibold">환불 정책</h2>
        <p>
          체크인 시간인 {checkIn} 오후 12:00 전에 취소하면 부분 환불을 받으실 수 있습니다. 그
          이후에는 취소 시점에 따라 환불액이 결정됩니다.
        </p>
        <RefundDetailModalButton
          checkIn={checkIn}
          checkOut={checkOut}
        />
      </div>
      <div>
        <div className="-mx-4 px-4 hover:bg-gray-100">
          <hr />
          <button
            className="w-full py-3"
            aria-label="여행 일정표 PDF 다운로드"
          >
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
          <button
            className="w-full py-3"
            aria-label="영수증 다운로드"
          >
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
  );
}
