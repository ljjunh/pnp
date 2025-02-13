import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routeURL';

interface RecentlyViewedCardProps{
  thumbnail:string
}

export function RecentlyViewedCard({thumbnail}:RecentlyViewedCardProps) {

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="aspect-square w-full rounded-2xl p-1 shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <Link href={ROUTES.USER.RECENTLY_VIEWED}>
          <div className="relative h-full w-full cursor-pointer">
            <Image
              src={thumbnail}
              alt="숙소 사진"
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </Link>
      </div>
      <div>
        <h3 className="text-base">최근 조회</h3>
        <p className="text-sm text-gray-400">오늘</p>
      </div>
    </div>
  );
}
