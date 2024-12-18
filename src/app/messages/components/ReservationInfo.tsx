interface ReservationInfoProps {
  showReservation: boolean;
  onToggleReservation: () => void;
}

export function ReservationInfo({ showReservation, onToggleReservation }: ReservationInfoProps) {
  return (
    <section
      className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
        showReservation ? 'w-1/4 opacity-100' : 'w-0 opacity-0'
      }`}
    >
      <header className="flex h-20 items-center justify-between border-b px-8 py-6">
        <h1 className="text-2xl">예약</h1>
        <button onClick={onToggleReservation}>X</button>
      </header>
      <div className="flex-1 overflow-y-scroll px-8 py-6">숙소 정보</div>
    </section>
  );
}
