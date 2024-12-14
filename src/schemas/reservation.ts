import { z } from 'zod';
import { schemaType } from '.';

// 숙소를 예약할 떄 사용하는 스키마
export const createReservationSchema = z.object({
  roomId: z.number().int().positive(),
  guestNumber: z.number().int().positive(),
  message: z.string().max(1000).optional(),
  checkIn: schemaType.checkIn,
  checkOut: schemaType.checkOut,
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
