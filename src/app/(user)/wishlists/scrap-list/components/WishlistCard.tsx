import Image from 'next/image';
import Link from 'next/link';
import { ScrapResponse } from '@/types/scrap';
import { ROUTES } from '@/constants/routeURL';

interface WishlistCardProps {
  scrapId: ScrapResponse['id'];
  scrapThumbnail: ScrapResponse['thumbnail'];
  scrapLocation: ScrapResponse['location'];
  scrapTitle: ScrapResponse['title'];
}

export function WishlistCard({
  scrapId,
  scrapThumbnail,
  scrapLocation,
  scrapTitle,
}: WishlistCardProps) {
  return (
    <div>
      <div className="relative aspect-square">
        <Link href={ROUTES.ROOMS.DETAIL(scrapId)}>
          <Image
            src={scrapThumbnail!}
            alt="숙소 사진"
            fill
            className="rounded-2xl object-cover"
          />
        </Link>
      </div>
      <div className="mt-2">
        <h3 className="text-base">{scrapLocation}</h3>
        <p className="text-sm text-neutral-500">{scrapTitle}</p>
      </div>
      <div className="mt-2 w-full rounded-xl bg-gray-100 p-3">
        <p className="cursor-pointer text-sm underline">메모 추가</p>
      </div>
    </div>
  );
}
