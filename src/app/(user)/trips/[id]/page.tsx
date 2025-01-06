import TripReservationContent from '../../components/reservation/TripReservationContent';

export default function ReservationDetail() {
  return (
    <main className="flex h-[calc(100vh-5rem)] w-full overflow-y-hidden">
      <section className="h-full w-[30%] px-2 pt-3 bg-neutral-100">
        <TripReservationContent />
      </section>
      <section className="w-[70%]">지도</section>
    </main>
  );
}
