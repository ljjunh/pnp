import { Help } from '@/app/(user)/trips/components/Help';
import { NoReservation } from '@/app/(user)/trips/components/NoReservation';
import { PreviousReservationCard } from '@/app/(user)/trips/components/PreviousReservationCard';
import { UpcomingReservationCard } from '@/app/(user)/trips/components/UpcomingReservationCard';
import { getReservationTrip } from '@/apis/trips/queries';
import { categorizeReservations } from '@/utils/categorizeReservation';
import { formatDate } from '@/utils/formatDate';

export const dynamic = 'force-dynamic'; // 동적 렌더링

export default async function Trips() {
  const reservations = await getReservationTrip();
  const { upcomingReservations, previousReservations } = categorizeReservations(reservations);

  return (
    <main className="flex w-full justify-center">
      <div className="w-full max-w-screen-2xl px-20 py-12">
        <h1 className="text-3xl font-semibold">여행</h1>

        {/* 다가오는 여행 예약 리스트 */}
        {upcomingReservations.length > 0 ? (
          <section>
            <h3 className="mb-2 mt-12 text-xl font-medium">다가오는 여행</h3>
            <div className="mb-12 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {upcomingReservations.map((reservation) => (
                <UpcomingReservationCard
                  key={reservation.id}
                  thumbnail={reservation.room.thumbnail}
                  location={reservation.room.location}
                  hostName={reservation.room.host.user.name}
                  checkIn={formatDate(reservation.checkIn)}
                  checkOut={formatDate(reservation.checkOut)}
                  orderNumber={reservation.orderNumber}
                />
              ))}
            </div>
          </section>
        ) : (
          // 에약된 여행 일정 없는 경우
          <NoReservation />
        )}

        {/* 지난 여행 리스트 */}
        {previousReservations.length > 0 && (
          <section>
            <h2 className="my-6 text-xl">이전 여행지</h2>
            <div className="grid grid-cols-3 gap-5">
              {previousReservations.map((reservation) => (
                <PreviousReservationCard
                  key={reservation.id}
                  thumbnail={reservation.room.thumbnail}
                  location={reservation.room.location}
                  hostName={reservation.room.host.user.name}
                  checkIn={formatDate(reservation.checkIn)}
                  checkOut={formatDate(reservation.checkOut)}
                  orderNumber={reservation.orderNumber}
                />
              ))}
            </div>
          </section>
        )}
        <hr className="mb-5 mt-12" />

        {/* 지원 센터 */}
        <Help />
      </div>
    </main>
  );
}
