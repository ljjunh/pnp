import RoomScrapButton from '@/app/(header-footer)/rooms/[id]/components/header/RoomScrapButton';
import RoomShareUrlButton from '@/app/(header-footer)/rooms/[id]/components/header/RoomShareUrlButton';
import { Room } from '@/types/room';
import { getScrap } from '@/apis/rooms/queries';

interface RoomHeaderProps {
  title: Room['title'];
  roomId: Room['id'];
}

export default async function RoomHeader({ title, roomId }: RoomHeaderProps) {
  const isScrap = await getScrap(roomId);

  return (
    <div className="flex justify-between">
      <div className="flex-1 text-2xl">{title}</div>
      <div className="flex flex-wrap gap-5">
        <RoomShareUrlButton />
        <RoomScrapButton
          roomId={roomId}
          initialIsScrap={isScrap}
        />
      </div>
    </div>
  );
}
