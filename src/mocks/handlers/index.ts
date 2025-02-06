import { registerHandlers } from '@/mocks/handlers/register';
import { reservationHandlers } from '@/mocks/handlers/reservation';
import { reviewsHandlers } from '@/mocks/handlers/reviews';
import { roomHandlers } from '@/mocks/handlers/rooms';

export const handlers = [
  ...roomHandlers,
  ...reviewsHandlers,
  ...reservationHandlers,
  ...registerHandlers,
];
