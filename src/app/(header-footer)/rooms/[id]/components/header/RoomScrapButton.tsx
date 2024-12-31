import { Room } from '@/types/room';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

interface RoomScrapButtonProps {
  roomId: Room['id'];
  isScrap: boolean;
}

export default function RoomScrapButton({ roomId, isScrap }: RoomScrapButtonProps) {
  console.log(roomId);

  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg p-2 text-sm underline hover:bg-neutral-01"
    >
      {isScrap ? (
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
