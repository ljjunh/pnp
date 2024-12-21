import { reviewsHandlers } from '@/mocks/handlers/reviews';
import { roomHandlers } from '@/mocks/handlers/rooms';

export const handlers = [...roomHandlers, ...reviewsHandlers];
