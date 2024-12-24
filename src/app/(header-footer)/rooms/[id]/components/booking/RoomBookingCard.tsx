'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoomBookingCalendar from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingCalendar';
import RoomBookingDropdown from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingDropdown';
import { CreateReservationInput } from '@/schemas';
import { addDays } from 'date-fns';
import { Room } from '@/types/room';
import Button from '@/components/common/Button/Button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { createReservation } from '@/apis/reservation/actions';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routeURL';

interface RoomBookingCardProps {
  price: Room['price'];
  roomId: Room['id'];
}

export default function RoomBookingCard({ price, roomId }: RoomBookingCardProps) {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<Date>(addDays(new Date(), 1));
  const [checkOut, setCheckOut] = useState<Date>(addDays(new Date(), 2));
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

  const handleCalendarToggle = () => {
    setShowGuestDropdown(false);
    setShowCalendar((prev) => !prev);
  };

  const handleGuestDropdownToggle = () => {
    setShowCalendar(false);
    setShowGuestDropdown((prev) => !prev);
  };

  const pricePerNight = price;
  const serviceFeePercentage = 10;

  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * (serviceFeePercentage / 100));
  const total = subtotal + serviceFee;

  const handleReservation = async () => {
    const guestNumber = guests.adults + guests.children + guests.infants + guests.pets;

    const reservationData: CreateReservationInput = {
      roomId,
      guestNumber,
      checkIn,
      checkOut,
    };
    const response = await createReservation(reservationData);
    if (!response.success) {
      switch (response.status) {
        case 400:
          toast({
            title: '예약 실패',
            description: '선택한 날짜는 이미 예약된 상태입니다. 다른 날짜를 선택해주세요',
            variant: 'destructive',
          });
          break;
        case 401:
          setShowDialog(true);
          break;
        default:
          alert(response.message);
      }
      return;
    }
    alert('성공했습니다.');
  };

  const handleConfirm = () => {
    setShowDialog(false);
    router.push(ROUTES.LOGIN); // 로그인 페이지로 이동
  };

  return (
    <>
      <div className="border-1 mt-8 rounded-xl border p-6 shadow-lg">
        <div className="mb-6">
          <span className="mr-1.5 font-bold">₩{pricePerNight.toLocaleString()}</span>
          <span className="text-base">/박</span>
        </div>

        <div className="mb-4 grid grid-cols-2 rounded-lg border border-neutral-05">
          <RoomBookingCalendar
            isOpen={showCalendar}
            onToggle={handleCalendarToggle}
            startDate={checkIn}
            endDate={checkOut}
            onDateChange={handleDateChange}
          />
          <RoomBookingDropdown
            isOpen={showGuestDropdown}
            onToggle={handleGuestDropdownToggle}
            guestCounts={guests}
            onGuestChange={handleGuestChange}
          />
        </div>
        <div className="px-[1px]">
          <Button
            variant="primary"
            size="full"
            onClick={handleReservation}
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
      {showDialog && (
        <AlertDialog
          open={showDialog}
          onOpenChange={setShowDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>로그인이 필요합니다</AlertDialogTitle>
              <AlertDialogDescription>로그인 후 이용하시겠습니까?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowDialog(false)}>취소</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
