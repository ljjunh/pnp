import Image from 'next/image';
import Link from 'next/link';
import { Reservation } from '@/types/reservation';
import { Room } from '@/types/room';
import { User } from '@/types/user';
import { ROUTES } from '@/constants/routeURL';

interface UpcomingReservationCardProps {
  hostName: User['name'];
  thumbnail: Room['thumbnail'];
  location: Room['location'];
  orderNumber: Reservation['orderNumber'];
  checkIn: string;
  checkOut: string;
}

export function UpcomingReservationCard({
  hostName,
  thumbnail,
  location,
  orderNumber,
  checkIn,
  checkOut,
}: UpcomingReservationCardProps) {
  return (
    <Link href={ROUTES.USER.TRIPS_DETAIL(orderNumber)}>
      <article className="rounded-2xl shadow-lg">
        <figure className="relative aspect-square">
          <Image
            src={thumbnail ?? '/images/no-thumbnail.png'}
            alt="숙소 사진"
            fill
            className="rounded-t-2xl object-cover"
          />
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
