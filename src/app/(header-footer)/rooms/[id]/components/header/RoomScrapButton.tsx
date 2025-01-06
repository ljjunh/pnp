'use client';

import { Room } from '@/types/room';
import { useRoomScrap } from '@/hooks/useRoomScrap';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

interface RoomScrapButtonProps {
  roomId: Room['id'];
  initialIsScrap: boolean;
}

export default function RoomScrapButton({ roomId, initialIsScrap }: RoomScrapButtonProps) {
  const { isScrap, isLoading, toggleScrap } = useRoomScrap({
    roomId,
    initialIsScrap,
  });

  return (
    <button
      onClick={toggleScrap}
      disabled={isLoading}
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
