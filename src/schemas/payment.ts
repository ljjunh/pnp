import { z } from 'zod';

export const paymentCreateSchema = z.object({
  orderId: z.string({
    required_error: '주문번호는 필수 입력입니다',
  }),
  paymentKey: z.string({
    required_error: '결제번호는 필수 입력입니다',
  }),
  amount: z.number({
    required_error: '결제 금액은 필수 입력입니다',
  }),
});

export type PaymentCreate = z.infer<typeof paymentCreateSchema>;
