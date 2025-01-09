import Image from 'next/image';
import Link from 'next/link';
import { Reservation } from '@/types/reservation';
import { Room } from '@/types/room';
import { User } from '@/types/user';
import { ROUTES } from '@/constants/routeURL';

interface PreviousReservationCardProps {
  hostName: User['name'];
  thumbnail: Room['thumbnail'];
  location: Room['location'];
  orderNumber: Reservation['orderNumber'];
  checkIn: string;
  checkOut: string;
}

export function PreviousReservationCard({
  hostName,
  thumbnail,
  location,
  orderNumber,
  checkIn,
  checkOut,
}: PreviousReservationCardProps) {
  return (
    <Link href={ROUTES.USER.TRIPS_DETAIL(orderNumber)}>
      <article className="flex cursor-pointer gap-3">
        <figure className="relative w-20">
          <Image
            src={thumbnail ?? '/images/no-thumbnail.png'}
            alt="숙소 사진"
            fill
            className="rounded-t-2xl object-cover"
          />
        </figure>
        <div className="flex flex-col gap-1 text-neutral-400">
          <address className="font-semibold not-italic text-black">{location}</address>
          <p className="text-sm">호스트: {hostName}님</p>
          <time className="text-sm">
            {checkIn} ~ {checkOut}
          </time>
        </div>
      </article>
    </Link>
  );
}
