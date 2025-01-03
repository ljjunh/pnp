import Image from 'next/image';

interface PreviousReservationCardProps {
  thumbnail: string | null;
  location: string;
  hostName: string | null;
  checkIn: string;
  checkOut: string;
}

export function PreviousReservationCard({
  thumbnail,
  location,
  hostName,
  checkIn,
  checkOut,
}: PreviousReservationCardProps) {
  return (
    <article className="flex cursor-pointer gap-3">
      <figure className="relative w-20">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt="숙소 이미지"
            fill
            className="rounded-lg object-cover"
          />
        )}
      </figure>
      <div className="flex flex-col gap-1 text-neutral-400">
        <address className="font-medium not-italic text-black">{location}</address>
        <p>호스트: {hostName}님</p>
        <time>
          {checkIn} ~ {checkOut}
        </time>
      </div>
    </article>
  );
}
