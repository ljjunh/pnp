import RoomScrapButton from '@/app/(header-footer)/rooms/[id]/components/header/RoomScrapButton';
import { Room } from '@/types/room';
import { LuShare } from 'react-icons/lu';

interface RoomHeaderProps {
  title: Room['title'];
  roomId: Room['id'];
}

export default function RoomHeader({ title, roomId }: RoomHeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex-1 text-2xl">{title}</div>
      <div className="flex flex-wrap gap-5">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-2 text-sm underline hover:bg-neutral-01"
        >
          <LuShare size={16} />
          공유하기
        </button>
        <RoomScrapButton roomId={roomId} />
      </div>
    </div>
  );
}
