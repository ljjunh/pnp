import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateReservationInput } from '@/schemas';
import { createReservation } from '@/apis/reservation/actions';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routeURL';

interface UseRoomBookingProps {
  roomId: number;
  guestCounts: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  dates: {
    checkIn: Date;
    checkOut: Date;
  };
}

export function useRoomBooking({ roomId, guestCounts, dates }: UseRoomBookingProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleReservation = async () => {
    const guestNumber = Object.values(guestCounts).reduce((sum, count) => sum + count, 0);

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
          setShowLoginDialog(true);
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

  const handleLoginConfirm = () => {
    setShowLoginDialog(false);
    router.push(ROUTES.LOGIN); // 로그인 페이지로 이동
  };

  return {
    showLoginDialog,
    setShowLoginDialog,
    handleReservation,
    handleLoginConfirm,
  };
}
