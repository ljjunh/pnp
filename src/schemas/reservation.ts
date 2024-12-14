import { z } from 'zod';
import { schemaType } from '.';

export const createReservationSchema = z
  .object({
    roomId: z.number().int().positive(),
    guestNumber: z.number().int().positive(),
    message: z.string().max(1000).optional(),
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
