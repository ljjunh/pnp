import { z } from 'zod';
import { schemaType } from '.';

// 숙소를 예약할 떄 사용하는 스키마
export const createReservationSchema = z
  .object({
    roomId: z.number().int().positive(),
    guestNumber: z.number().int().positive(),
    message: z.string().max(1000).optional(),
    checkIn: schemaType.checkIn,
    checkOut: schemaType.checkOut,
  })
  .refine((data) => data.checkOut.getTime() > data.checkIn.getTime(), {
    message: '체크아웃 날짜는 체크인 날짜 이후여야 합니다',
    path: ['checkOut'],
  });

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
