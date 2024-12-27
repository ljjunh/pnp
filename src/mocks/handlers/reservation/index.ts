import { createReservationHandler } from '@/mocks/handlers/reservation/createReservation';
import { getReservationHandler } from '@/mocks/handlers/reservation/getReservation';

export const reservationHandlers = [getReservationHandler, createReservationHandler];
