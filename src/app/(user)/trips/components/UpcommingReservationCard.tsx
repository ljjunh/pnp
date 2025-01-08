import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routeURL';

interface UpcommingReservationCardProps {
  thumbnail: string | null;
  location: string;
  hostName: string | null;
  checkIn: string;
  checkOut: string;
  orderNumber: string;
}

export function UpcommingReservationCard({
  thumbnail,
  location,
  hostName,
  checkIn,
  checkOut,
  orderNumber,
}: UpcommingReservationCardProps) {
  return (
    <Link href={ROUTES.USER.TRIPS_DETAIL(orderNumber)}>
      <article className="rounded-2xl shadow-lg">
        <figure className="relative aspect-square">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt="숙소 사진"
              fill
              className="rounded-t-2xl object-cover"
            />
          )}
        </figure>
        <div className="p-3 text-neutral-400">
          <address className="text-lg font-semibold not-italic text-black">{location}</address>
          <p>호스트: {hostName} 님</p>
          <time>
            {checkIn} ~ {checkOut}
          </time>
        </div>
      </article>
    </Link>
  );
}
