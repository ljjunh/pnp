// components/BookingPage.tsx
import Image from 'next/image';
import Payment from './_components/payment';

export default async function BookingPage() {
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
          alt="Room"
          width={100}
          height={100}
          className="rounded-lg"
        />
        <div>
          <h2 className="font-medium">dmyk_Trapezoid</h2>
          <div className="flex items-center gap-1 text-sm">
            <span>★ 4.63 (총 628개) •</span>
            <span className="text-gray-500">슈퍼호스트</span>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="mb-6 space-y-4">
        <div className="flex justify-between">
          <span>날짜</span>
          <span className="text-right">12월 18일-19일</span>
        </div>
        <div className="flex justify-between">
          <span>체크인 시간</span>
          <span className="text-right">오후 4:00 - 오후 6:00</span>
        </div>
        <div className="flex justify-between">
          <span>게스트</span>
          <span className="text-right">게스트 1명</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 border-t pt-4">
        <h2 className="mb-4 font-medium">요금 세부정보</h2>
        <div className="flex justify-between">
          <span>₩36,000 x 1박</span>
          <span>₩36,000</span>
        </div>
        <div className="flex justify-between">
          <span>에어비앤비 서비스 수수료</span>
          <span>₩5,590</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>총 합계 (KRW)</span>
          <span>₩41,590</span>
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
