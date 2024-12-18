import { PaymentCreate } from '@/schemas/payment';

const TOSSPAYMENT_BASE_URL = 'https://api.tosspayments.com';
const encodeSecretKey = Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64');
console.log(encodeSecretKey);
/**
 * 토스 페이먼츠에 실제 결제를 요청합니다.
 * @param userId
 * @param data
 */
export async function createPayment(userId: string, data: PaymentCreate) {
  try {
    const request = await fetch(`${TOSSPAYMENT_BASE_URL}/v1/payments/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodeSecretKey}`,
      },
      body: JSON.stringify({
        paymentKey: data.paymentKey,
        orderId: data.orderId,
        amount: data.amount,
      }),
    });

    const response = await request.json();
    console.log(response);
  } catch (error) {
    console.error('결제 요청에 실패하였습니다.', error);
  }
}
