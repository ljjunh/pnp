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

export const tossPaymentCreateSchema = z.object({
  orderId: orderIdSchema,
  paymentKey: z.string({
    required_error: '결제번호는 필수 입력입니다',
  }),
  amount: amountSchema,
  error: z.string().optional(),
});

export const naverPayCreateSchema = z.object({
  paymentId: z.string({
    required_error: '결제번호는 필수 입력입니다',
  }),
});

export const kakaoPayCreateSchema = z.object({
  pgToken: z.string({
    required_error: 'PG 토큰은 필수 입력입니다',
  }),
  orderId: orderIdSchema,
  tid: z.string({
    required_error: 'TID는 필수 입력입니다',
  }),
});

export const paymentReadySchema = z.object({
  name: z.string({
    required_error: '결제사 이름은 필수 입력입니다',
  }),
  orderId: orderIdSchema,
  amount: amountSchema,
  orderName: z.string({
    required_error: '주문명은 필수 입력입니다',
  }),
});

export const paymentConfirmSchema = {
  toss: tossPaymentCreateSchema,
  kakaopay: kakaoPayCreateSchema,
  naverpay: naverPayCreateSchema,
} as const;

export type PaymentConfirmData = {
  toss: TossPaymentCreate;
  kakaopay: KakaoPayCreate;
  naverpay: NaverPayCreate;
};
export type TossPaymentCreate = z.infer<typeof tossPaymentCreateSchema>;
export type NaverPayCreate = z.infer<typeof naverPayCreateSchema>;
export type KakaoPayCreate = z.infer<typeof kakaoPayCreateSchema>;
export type PaymentReady = z.infer<typeof paymentReadySchema>;
