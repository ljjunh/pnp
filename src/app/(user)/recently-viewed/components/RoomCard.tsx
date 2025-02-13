import Image from 'next/image';
import Link from 'next/link';
import { RecentViewResponse } from '@/types/recent';
import { ROUTES } from '@/constants/routeURL';
import { FaRegHeart } from 'react-icons/fa6';

interface RoomCardProps {
  isEdit: boolean;
  recentView: RecentViewResponse;
}

export function RoomCard({ isEdit, recentView }: RoomCardProps) {
  return (
    <div>
      <div className="relative aspect-square">
        {isEdit === true && (
          <div className="absolute left-3 top-3 z-10 cursor-pointer rounded-full bg-slate-50 px-2 shadow-lg hover:scale-105 hover:bg-white">
            <span>&times;</span>
          </div>
        )}
        <FaRegHeart className="absolute right-3 top-3 z-10 size-6 cursor-pointer fill-white hover:scale-110 active:scale-90" />
        <Link href={ROUTES.ROOMS.DETAIL(recentView.id)}>
          <Image
            src={recentView.thumbnail!}
            alt="숙소 사진"
            fill
            className="rounded-2xl object-cover"
          />
        </Link>
      </div>
      <div className="mt-2">
        <h3 className="text-base">{recentView.location}</h3>
        <p className="text-overflow-ellipsis overflow-hidden whitespace-nowrap text-sm text-neutral-500">
          {recentView.title}
        </p>
      </div>
    </div>
  );
}
