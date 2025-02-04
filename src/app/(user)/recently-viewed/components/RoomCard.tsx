import { ROUTES } from '@/constants/routeURL';
import { RecentViewResponse } from '@/types/recent';
import Image from 'next/image';
import Link from 'next/link';

interface RoomCardProps {
  isEdit: boolean;
  recentView: RecentViewResponse;
}

export function RoomCard({ isEdit, recentView }: RoomCardProps) {
  return (
    <Link href={ROUTES.ROOMS.DETAIL(recentView.id)}>
      <div className="relative aspect-square">
        {isEdit === true && (
          <div className="absolute left-3 top-3 z-10 cursor-pointer rounded-full bg-slate-50 px-2 shadow-lg hover:scale-105 hover:bg-white">
            <span>&times;</span>
          </div>
        )}
        <Image
          src={recentView.thumbnail!}
          alt="숙소 사진"
          fill
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-base">{recentView.location}</h3>
        <p className="text-sm text-neutral-500 overflow-hidden whitespace-nowrap text-overflow-ellipsis">{recentView.title}</p>
      </div>
    </Link>
  );
}
