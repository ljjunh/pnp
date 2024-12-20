import { z } from 'zod';

export const paymentCreateSchema = z.object({
  orderId: z.string({
    required_error: '주문번호는 필수 입력입니다',
  }),
  paymentKey: z.string({
    required_error: '결제번호는 필수 입력입니다',
  }),
  amount: z
    .number({
      required_error: '결제 금액은 필수 입력입니다',
    })
    .min(100, '결제 금액은 최소 100원 이상이어야 합니다')
    .max(10_000_000, '결제 금액은 최대 10,000,000원 이하여야 합니다')
    .nonnegative('결제 금액은 0원 이상이어야 합니다'),
  error: z.string().optional(),
});

export type PaymentCreate = z.infer<typeof paymentCreateSchema>;
