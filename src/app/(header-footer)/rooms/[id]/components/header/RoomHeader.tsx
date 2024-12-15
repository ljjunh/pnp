import { Room } from '@/types/room';
import { IoIosHeartEmpty } from 'react-icons/io';
import { LuShare } from 'react-icons/lu';

interface RoomHeaderProps {
  title: Room['title'];
}

export default function RoomHeader({ title }: RoomHeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex-1 text-2xl">{title}</div>
      <div className="flex flex-wrap gap-5">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-2 text-sm underline hover:bg-neutral-01"
        >
          <LuShare />
          공유하기
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-2 text-sm underline hover:bg-neutral-01"
        >
          <IoIosHeartEmpty />
          저장
        </button>
      </div>
    </div>
  );
}
