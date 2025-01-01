'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Room } from '@/types/room';
import { useRoomScrap } from '@/hooks/useRoomScrap';
import { ROUTES } from '@/constants/routeURL';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';

interface RoomScrapButtonProps {
  roomId: Room['id'];
  initialIsScrap: boolean;
}

export default function RoomScrapButton({ roomId, initialIsScrap }: RoomScrapButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { isScrap, isLoading, handleCreateScrap } = useRoomScrap(roomId, initialIsScrap);

  const handleScrapClick = () => {
    if (!session) {
      router.push(ROUTES.LOGIN);
      return;
    }
    if (!isScrap) {
      handleCreateScrap();
    }
  };

  return (
    <button
      onClick={handleScrapClick}
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
