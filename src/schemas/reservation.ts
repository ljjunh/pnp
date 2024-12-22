import { z } from 'zod';
import { schemaType } from '.';

export const createReservationSchema = z
  .object({
    roomId: z.number().int().positive(),
    guestNumber: z.number().int().positive('게스트 수는 1명 이상이어야 합니다.'),
    checkIn: schemaType.checkIn,
    checkOut: schemaType.checkOut,
  })
  .refine(schemaType.dateRefinement.refinement, schemaType.dateRefinement.options);

export type CreateReservationInput = z.infer<typeof createReservationSchema>;

export const reservationAvailableSchema = z
  .object({
    roomId: z.number().int().positive(),
    checkIn: schemaType.checkIn,
    checkOut: schemaType.checkOut,
  })
  .refine(schemaType.dateRefinement.refinement, schemaType.dateRefinement.options);

export type ReservationAvailableInput = z.infer<typeof reservationAvailableSchema>;
