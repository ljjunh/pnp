import { getReservation } from '@/apis/reservation/queries';
import TripReservationContent from '../../components/reservation/TripReservationContent';

export default async function ReservationDetail({ params }: { params: { orderNumber: string } }) {
  // if (isNaN(Number(params.orderNumber))) {
  //   return notFound();
  // }
  console.log(params.orderNumber)
  const reservation = await getReservation(params.orderNumber);
  console.log(reservation);
  return (
    <main className="flex h-[calc(100vh-5rem)] w-full overflow-y-hidden">
      <section className="h-full w-[30%] bg-neutral-100 px-2 pt-3">
        <TripReservationContent />
      </section>
      <section className="w-[70%]">지도</section>
    </main>
  );
}
