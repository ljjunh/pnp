import { Room } from '@/types/room';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

interface RoomScrapButtonProps {
  roomId: Room['id'];
}

export default function RoomScrapButton({ roomId }: RoomScrapButtonProps) {
  const temp = false;
  console.log(roomId);
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg p-2 text-sm underline hover:bg-neutral-01"
    >
      {temp ? (
        <IoIosHeart
          className="text-primary-01"
          size={20}
        />
      ) : (
        <IoIosHeartEmpty size={19} />
      )}
      저장
    </button>
  );
}
