import { Help } from '@/app/(guest)/trips/components/Help';
import { NoReservation } from '@/app/(guest)/trips/components/NoReservation';
import { ReservationCard } from '@/app/(guest)/trips/components/ReservationCard';

const reservation = [];

export default function Trips() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-screen-2xl px-20 py-12">
        <h1 className="text-3xl font-semibold">여행</h1>

        {reservation.length > 0 ? (
          <div className="my-12 grid h-72 w-full grid-cols-1 rounded-lg border border-gray-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            예약 내역들
          </div>
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
