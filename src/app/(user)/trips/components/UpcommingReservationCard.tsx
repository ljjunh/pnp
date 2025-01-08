import Image from 'next/image';

interface UpcommingReservationCardProps {
  thumbnail: string | null;
  location: string;
  hostName: string | null;
  checkIn: string;
  checkOut: string;
}

export function UpcommingReservationCard({
  thumbnail,
  location,
  hostName,
  checkIn,
  checkOut,
}: UpcommingReservationCardProps) {
  return (
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
      <div className="p-3">
        <address className="not-italic">{location}</address>
        <p>호스트: {hostName} 님</p>
        <time>
          {checkIn} ~ {checkOut}
        </time>
      </div>
    </article>
  );
}
