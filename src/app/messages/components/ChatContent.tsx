interface ChatContentProps {
  showReservation: boolean;
  onToggleReservation: () => void;
}

export function ChatContent({ showReservation, onToggleReservation }: ChatContentProps) {
  return (
    <section
      className={`flex flex-col border-x transition-all duration-300 ease-in-out ${showReservation ? 'w-1/2' : 'w-3/4'}`}
    >
      <header className="flex h-20 items-center justify-between border-b px-8 py-6">
        <div className="flex gap-1">
          <div>호스트 프로필 사진</div>
          <h1 className="text-2xl">호스트 이름</h1>
        </div>
        {showReservation ? null : <button onClick={onToggleReservation}>예약보기</button>}
      </header>
      <div className="flex-1 overflow-y-scroll px-8 py-6">채팅 내역</div>
      <div className="h-14 px-8">검색 창</div>
    </section>
  );
}
