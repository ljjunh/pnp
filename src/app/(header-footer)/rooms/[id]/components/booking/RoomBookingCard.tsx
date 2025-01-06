'use client';

import { useState } from 'react';
import RoomBookingButton from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingButton';
import RoomBookingCalendar from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingCalendar';
import RoomBookingDropdown from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingDropdown';
import { Room } from '@/types/room';
import { calculatePrice } from '@/utils/calculatePrice';

interface RoomBookingCardProps {
  price: Room['price'];
  roomId: Room['id'];
  availableDates: string[];
}

interface Dates {
  checkIn: Date | null;
  checkOut: Date | null;
  showCalendar: boolean;
}

export default function RoomBookingCard({ price, roomId, availableDates }: RoomBookingCardProps) {
  const [dates, setDates] = useState<Dates>({
    checkIn: null,
    checkOut: null,
    showCalendar: false,
  });
  const [guests, setGuests] = useState({
    counts: {
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0,
    },
    showDropdown: false,
  });

  const handleGuestChange = (type: keyof typeof guests.counts, value: number) => {
    setGuests((prev) => ({
      ...prev,
      counts: {
        ...prev.counts,
        [type]: value,
      },
    }));
  };

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setDates((prev) => ({
      ...prev,
      checkIn: startDate,
      checkOut: endDate,
    }));
  };

  const handleCalendarToggle = () => {
    setGuests((prev) => ({
      ...prev,
      showDropdown: false,
    }));
    setDates((prev) => ({
      ...prev,
      showCalendar: !prev.showCalendar,
    }));
  };

  const handleGuestDropdownToggle = () => {
    setDates((prev) => ({
      ...prev,
      showCalendar: false,
    }));
    setGuests((prev) => ({
      ...prev,
      showDropdown: !prev.showDropdown,
    }));
  };

  const nights =
    dates.checkIn instanceof Date && dates.checkOut instanceof Date
      ? Math.ceil((dates.checkOut.getTime() - dates.checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const { subtotal, serviceFee, total } = calculatePrice({
    price,
    nights,
  });

  return (
    <div className="border-1 mt-8 rounded-xl border p-6 shadow-lg">
      <div className="mb-6">
        <span className="mr-1.5 font-bold">₩{price.toLocaleString()}</span>
        <span className="text-base">/박</span>
      </div>

      <div className="mb-4 grid grid-cols-2 rounded-lg border border-neutral-05">
        <RoomBookingCalendar
          roomId={roomId}
          initialDates={availableDates}
          isOpen={dates.showCalendar}
          onToggle={handleCalendarToggle}
          startDate={dates.checkIn}
          endDate={dates.checkOut}
          onDateChange={handleDateChange}
        />
        <RoomBookingDropdown
          isOpen={guests.showDropdown}
          onToggle={handleGuestDropdownToggle}
          guestCounts={guests.counts}
          onGuestChange={handleGuestChange}
        />
      </div>
      <RoomBookingButton
        roomId={roomId}
        guestCounts={guests.counts}
        dates={{
          checkIn: dates.checkIn,
          checkOut: dates.checkOut,
        }}
      />
      <div className="mt-2 flex justify-center">
        <span className="mt-2 text-sm text-neutral-07">
          예약 확정 전에는 요금이 청구되지 않습니다.
        </span>
      </div>
      <section className="mt-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="underline">
            ₩{price.toLocaleString()} x {nights}박
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
