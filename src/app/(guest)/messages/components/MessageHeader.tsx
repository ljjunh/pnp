import { FaUserCircle } from 'react-icons/fa';

interface MessageContentHeaderProps {
  showReservation: boolean;
  toggleReservation: () => void;
}

export function MessageHeader({ showReservation, toggleReservation }: MessageContentHeaderProps) {
  return (
    <div className="flex h-20 items-center justify-between border-b px-8 py-6">
      <div className="flex items-center gap-3">
        <FaUserCircle
          size={40}
          className="text-gray-500"
          aria-label="호스트 프로필 이미지"
        />
        <h1 className="text-2xl">호스트 이름</h1>
      </div>
      {showReservation ? null : <button onClick={toggleReservation}>예약보기</button>}
    </div>
  );
}
