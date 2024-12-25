import Image from 'next/image';
import Payment from '@/app/(header-footer)/book/[orderNumber]/components/payment';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Reservation } from '@/types/reservation';
import { getReservation } from '@/apis/reservation/queries';

export default async function BookingPage({ params }: { params: { orderNumber: string } }) {
  const reservation: Reservation = await getReservation(params.orderNumber);
  console.log('데이터---', reservation);

  const serviceFee = Math.round(reservation.totalPrice * (10 / 100));

  // date-fns로 날짜/시간 포맷팅
  const checkInDate = format(reservation.checkIn, 'M월 d일', { locale: ko });
  const checkOutDate = format(reservation.checkOut, 'M월 d일', { locale: ko });

  return (
    <div className="mx-auto max-w-3xl p-4">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <button className="text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="ml-2 text-xl font-medium">확인 및 결제</h1>
      </div>

      {/* Price Info Card */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">지번한 요금</span>
          <div className="rounded bg-pink-100 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-pink-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm11 14V6H4v10h12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <p className="mt-1 text-sm">
          검색하시는 날짜의 요금은 지난 3개월의 평균 1박 요금보다 ₩22,976 저렴합니다.
        </p>
      </div>

      {/* Room Info */}
      <div className="mb-6 flex gap-4">
        <Image
          src="/room-image.jpg"
          alt={'호스트 프로필 이미지'}
          width={100}
          height={100}
          className="rounded-lg"
        />
        <div>
          <h2 className="font-medium">{reservation.room.host.user.name}</h2>
          <div className="flex items-center gap-1 text-sm">
            <span>
              ★ {reservation.room.reviewsAverage} (총 {reservation.room.reviewsCount}개) •
            </span>
            <span className="text-gray-500">
              {reservation.room.host.isSuperHost ? '슈퍼호스트' : '호스트'}
            </span>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="mb-6 space-y-4">
        <div className="flex justify-between">
          <span>날짜</span>
          <span className="text-right">
            {checkInDate}-{checkOutDate}
          </span>
        </div>
        <div className="flex justify-between">
          <span>체크인 시간</span>
          <span className="text-right">오후 3시</span>
        </div>
        <div className="flex justify-between">
          <span>게스트</span>
          <span className="text-right">게스트 {reservation.guestNumber}명</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 border-t pt-4">
        <h2 className="mb-4 font-medium">요금 세부정보</h2>
        <div className="flex justify-between">
          <span>
            ₩{reservation.room.price.toLocaleString()} x {reservation.days}박
          </span>
          <span>₩{reservation.totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>에어비앤비 서비스 수수료</span>
          <span>₩{serviceFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>총 합계 (KRW)</span>
          <span>₩{(reservation.totalPrice + serviceFee).toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-6">
        <h2 className="mb-4 font-medium">결제 수단</h2>
        <Payment />
      </div>
    </div>
  );
}
