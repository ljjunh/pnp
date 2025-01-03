import { ReservationTrip } from '@/types/reservation';

export function categorizeReservations(reservations: ReservationTrip[]) {
  const now = new Date();

  return {
    upcomingReservations: reservations
      .filter((reservation) => {
        const checkIn = new Date(reservation.checkIn);

        return checkIn >= now;
      })
      .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()),

    previousReservations: reservations
      .filter((reservation) => {
        const checkIn = new Date(reservation.checkIn);

        return checkIn < now;
      })
      .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()), // 과거 여행은 최신순
  };
}
