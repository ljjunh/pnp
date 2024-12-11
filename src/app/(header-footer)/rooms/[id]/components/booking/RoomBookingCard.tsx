'use client';

import { useState } from 'react';
import RoomBookingCalendar from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingCalendar';
import RoomBookingDropdown from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingDropdown';
import Button from '@/components/common/Button/Button';

export default function RoomBookingCard() {
  const [checkIn, setCheckIn] = useState<Date>(new Date('2025-01-05'));
  const [checkOut, setCheckOut] = useState<Date>(new Date('2025-01-10'));
  const [showCalendar, setShowCalendar] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleGuestChange = (type: keyof typeof guests, value: number) => {
    setGuests((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setCheckIn(startDate);
    setCheckOut(endDate);
  };

  const pricePerNight = 55000;
  const serviceFeePercentage = 10;

  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * (serviceFeePercentage / 100));
  const total = subtotal + serviceFee;

  return (
    <div className="border-1 mt-8 rounded-xl border p-6 shadow-lg">
      <div className="mb-6">
        <span className="mr-1.5 font-bold">₩{pricePerNight.toLocaleString()}</span>
        <span className="text-base">/박</span>
      </div>

      <div className="mb-4 grid grid-cols-2 rounded-lg border border-neutral-05">
        {/* <button className="border-b border-r border-neutral-05 px-3 py-2.5 text-left">
          <div className="text-[10px]">체크인</div>
          <div className="text-sm">{checkIn}</div>
        </button>
        <button className="border-b border-neutral-05 px-3 py-2.5 text-left">
          <div className="text-[10px]">체크아웃</div>
          <div className="text-sm">{checkOut}</div>
        </button> */}

        <RoomBookingCalendar
          isOpen={showCalendar}
          onToggle={() => setShowCalendar((prev) => !prev)}
          startDate={checkIn}
          endDate={checkOut}
          onDateChange={handleDateChange}
        />
        <RoomBookingDropdown
          isOpen={showGuestDropdown}
          onToggle={() => setShowGuestDropdown((prev) => !prev)}
          guestCounts={guests}
          onGuestChange={handleGuestChange}
        />
      </div>
      <div className="px-[1px]">
        <Button
          variant="primary"
          size="full"
        >
          예약하기
        </Button>
      </div>
      <div className="mt-2 flex justify-center">
        <span className="mt-2 text-sm text-neutral-07">
          예약 확정 전에는 요금이 청구되지 않습니다.
        </span>
      </div>
      <section className="mt-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="underline">
            ₩{pricePerNight.toLocaleString()} x {nights}박
          </div>
          <div>₩{subtotal.toLocaleString()}</div>
        </div>
        <div className="flex justify-between">
          <div className="underline">에어비앤비 서비스 수수료</div>
          <div>₩{serviceFee.toLocaleString()}</div>
        </div>
        <div className="mt-6 flex justify-between border-t pt-6">
          <div>총 합계</div>
          <div className="font-bold">₩{total.toLocaleString()}</div>
        </div>
      </section>
    </div>
  );
}
