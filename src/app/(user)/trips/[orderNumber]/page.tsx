import TripReservationContent from '@/app/(user)/components/reservation/TripReservationContent';
import GoogleMapView from '@/components/common/Map/GoogleMapView';
import { getReservation } from '@/apis/reservation/queries';

export default async function ReservationDetail({ params }: { params: { orderNumber: string } }) {
  const reservation = await getReservation(params.orderNumber);

  return (
    <main className="flex h-[calc(100vh-5rem)] w-full overflow-y-hidden">
      {/* 예약 정보 */}
      <section className="h-full w-[30%] bg-neutral-100 px-2 pt-3">
        <TripReservationContent reservation={reservation} />
      </section>

      {/* 지도 */}
      <section className="h-full w-[70%]">
        <GoogleMapView
          lat={Number(reservation.room.latitude)}
          lng={Number(reservation.room.longitude)}
          height="100%"
        />
      </section>
    </main>
  );
}
