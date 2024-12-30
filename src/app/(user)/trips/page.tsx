import Image from 'next/image';
import { Help } from '@/app/(user)/trips/components/Help';
import { NoReservation } from '@/app/(user)/trips/components/NoReservation';
import { ReservationCard } from '@/app/(user)/trips/components/ReservationCard';
import { getReservationTrip } from '@/apis/trips/queries';

function formatDate(dateString: Date) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  // getMonth()는 0부터 시작
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}

export default async function Trips() {
  const reservations = await getReservationTrip();
  // const reservations = []

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-screen-2xl px-20 py-12">
        <h1 className="text-3xl font-semibold">여행</h1>

        {reservations.length > 0 ? (
          <>
            <h3 className="mb-2 mt-12 text-xl font-medium">다가오는 여행</h3>
            <div className="mb-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="rounded-2xl shadow-lg"
                >
                  <div className="relative aspect-square">
                    {reservation.room.thumbnail && (
                      <Image
                        src={reservation.room.thumbnail}
                        alt="숙소 사진"
                        fill
                        className="rounded-t-2xl object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <p>{reservation.room.location}</p>
                    <p>호스트: {reservation.room.host.user.name} 님</p>
                    <p>
                      {formatDate(reservation.checkIn)} ~ {formatDate(reservation.checkOut)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <NoReservation />
        )}

        <h2 className="my-6 text-xl">이전 여행지</h2>

        <ul className="grid grid-cols-3 gap-5">
          <ReservationCard />
        </ul>

        <hr className="mb-5 mt-12" />
        <Help />
      </div>
    </div>
  );
}
