import { FaUserCircle } from 'react-icons/fa';
import { IoImageOutline } from "react-icons/io5";

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
        <div className="flex items-center gap-3">
          <FaUserCircle
            size={48}
            className="text-gray-500"
          />
          <h1 className="text-2xl">호스트 이름</h1>
        </div>
        {showReservation ? null : <button onClick={onToggleReservation}>예약보기</button>}
      </header>
      <div className="flex-1 overflow-y-scroll px-10 py-6">채팅 내역</div>
      <div className="h-24 px-10 flex items-center gap-3">
        <IoImageOutline className="size-7" />
        <form className="relative w-full text-base">
          <input
            type="text"
            placeholder="메세지를 입력하세요."
            className="w-full rounded-3xl border border-gray-300 py-2 pl-6 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
          />
        </form>
      </div>
    </section>
  );
}
