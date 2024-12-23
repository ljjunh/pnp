interface ReservationHeaderProps {
  toggleReservation: () => void;
}

export function ReservationHeader({ toggleReservation }: ReservationHeaderProps) {
  return (
    <div className="flex h-20 items-center justify-between border-b px-8 py-6">
      <h1 className="text-2xl font-medium">예약</h1>
      <button
        className="cursor-pointer rounded-full bg-gray-100 px-3 py-1"
        onClick={toggleReservation}
        aria-label="예약 정보 창 닫기"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
