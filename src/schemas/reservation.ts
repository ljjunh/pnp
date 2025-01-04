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

export const reservationAvailableSchema = z.object({
  roomId: z.number().int().positive(),
  year: z
    .number({
      required_error: '년도는 필수 입력입니다.',
      invalid_type_error: '올바른 년도 형식이 아닙니다.',
    })
    .int()
    .min(2024, '최소 2024년 이후로 조회할 수 있습니다.')
    .max(9999, '최대 9999년까지 입력할 수 있습니다.')
    .positive(),
  month: z
    .number({
      required_error: '월은 필수 입력입니다.',
      invalid_type_error: '올바른 월 형식이 아닙니다.',
    })
    .int()
    .min(1, {
      message: '최소 1월부터 입력할 수 있습니다.',
    })
    .max(12, {
      message: '최대 12월까지 입력할 수 있습니다',
    })
    .positive(),
});

export type ReservationAvailableInput = z.infer<typeof reservationAvailableSchema>;
