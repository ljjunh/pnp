import { z } from 'zod';

const orderIdSchema = z.string({
  required_error: '주문번호는 필수 입력입니다',
});

const amountSchema = z
  .number({
    required_error: '결제 금액은 필수 입력입니다',
  })
  .min(100, '결제 금액은 최소 100원 이상이어야 합니다')
  .max(10_000_000, '결제 금액은 최대 10,000,000원 이하여야 합니다')
  .nonnegative('결제 금액은 0원 이상이어야 합니다');

export const paymentConfirmSchema = z.object({
  paymentId: z.string({
    required_error: '결제 ID는 필수 입력입니다',
  }),
  orderId: orderIdSchema,
  transactionId: z.string({
    required_error: '거래 ID는 필수 입력입니다',
  }),
  amount: amountSchema,
});

export type PaymentConfirm = z.infer<typeof paymentConfirmSchema>;
