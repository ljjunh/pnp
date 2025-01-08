'use client';

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
import { useRoomBooking } from '@/hooks/useRoomBooking';

interface RoomBookingButtonProps {
  roomId: number;
  guestCounts: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  dates: {
    checkIn: Date | null;
    checkOut: Date | null;
  };
}

export default function RoomBookingButton({ roomId, guestCounts, dates }: RoomBookingButtonProps) {
  const { showLoginDialog, setShowLoginDialog, handleReservation, handleLoginConfirm } =
    useRoomBooking({ roomId, guestCounts, dates });

  return (
    <>
      <div className="px-[1px]">
        <Button
          variant="primary"
          size="full"
          onClick={handleReservation}
          isDisabled={!roomId || !dates.checkIn || !dates.checkOut}
        >
          예약하기
        </Button>
      </div>
      {showLoginDialog && (
        <AlertDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>로그인이 필요합니다</AlertDialogTitle>
              <AlertDialogDescription>로그인 후 이용하시겠습니까?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowLoginDialog(false)}>취소</AlertDialogCancel>
              <AlertDialogAction onClick={handleLoginConfirm}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
