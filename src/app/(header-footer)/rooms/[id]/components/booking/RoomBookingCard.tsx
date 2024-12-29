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
import { calculatePrice } from '@/utils/calculatePrice';
import { ROUTES } from '@/constants/routeURL';

interface RoomBookingCardProps {
  price: Room['price'];
  roomId: Room['id'];
}

export default function RoomBookingCard({ price, roomId }: RoomBookingCardProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [dates, setDates] = useState({
    checkIn: addDays(new Date(), 1),
    checkOut: addDays(new Date(), 2),
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

  const handleDateChange = (startDate: Date, endDate: Date) => {
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

  const nights = Math.ceil(
    (dates.checkOut.getTime() - dates.checkIn.getTime()) / (1000 * 60 * 60 * 24),
  );

  const { subtotal, serviceFee, total } = calculatePrice({
    price,
    nights,
  });

  const handleReservation = async () => {
    const guestNumber = Object.values(guests.counts).reduce((sum, count) => sum + count, 0);

    const reservationData: CreateReservationInput = {
      roomId,
      guestNumber,
      checkIn: dates.checkIn,
      checkOut: dates.checkOut,
    };

    const response = await createReservation(reservationData);
    if (!response.success) {
      switch (response.status) {
        case 400:
          switch (response.message) {
            case '이미 예약이 되어있습니다.':
              toast({
                title: '예약 실패',
                description: '선택한 날짜는 이미 예약된 상태입니다. 다른 날짜를 선택해주세요',
                variant: 'destructive',
              });
              break;
            case '숙소의 최대 인원 수를 초과하였습니다.':
              toast({
                title: '예약 실패',
                description: '선택하신 인원이 숙소 최대 수용 인원을 초과합니다',
                variant: 'destructive',
              });
              break;
            default:
              toast({
                title: '예약 실패',
                description: response.message,
                variant: 'destructive',
              });
          }
          break;
        case 401:
          setShowDialog(true);
          break;
        default:
          toast({
            title: response.message,
            variant: 'destructive',
          });
      }
      return;
    }

    // 성공했지만 orderNumber가 없는 경우는 서버 에러로 간주
    if (!response.data?.orderNumber) {
      toast({
        title: '예약 실패',
        description: '예약은 완료되었으나 주문번호를 받아오지 못했습니다. 고객센터로 문의해주세요.',
        variant: 'destructive',
      });
      return;
    }
    // 타입이 보장된 상태일때만 라우팅
    router.push(ROUTES.RESERVATION(response.data?.orderNumber));
  };

  const handleConfirm = () => {
    setShowDialog(false);
    router.push(ROUTES.LOGIN); // 로그인 페이지로 이동
  };

  return (
    <>
      <div className="border-1 mt-8 rounded-xl border p-6 shadow-lg">
        <div className="mb-6">
          <span className="mr-1.5 font-bold">₩{price.toLocaleString()}</span>
          <span className="text-base">/박</span>
        </div>

        <div className="mb-4 grid grid-cols-2 rounded-lg border border-neutral-05">
          <RoomBookingCalendar
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
