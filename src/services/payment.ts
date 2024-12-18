import { sendToRetryQueue } from '@/lib/server/queue';
import { PaymentCreate } from '@/schemas/payment';

const TOSSPAYMENT_BASE_URL = 'https://api.tosspayments.com';
const encodeSecretKey = Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64');

/**
 * 토스 페이먼츠에 실제 결제를 요청합니다.
 * @param {string} userId 사용자 식별자
 * @param {PaymentCreate} data 결제 요청 데이터
 * @param {string} errorCode 테스트용 에러 코드
 */
export async function createPayment(userId: string, data: PaymentCreate, errorCode?: string) {
  const idempotentKey = `${userId}-${data.orderId}`;
  try {
    throw new Error('결제 요청에 실패하였습니다.');

    // const request = await fetch(`${TOSSPAYMENT_BASE_URL}/v1/payments/confirm`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Idempotency-Key': idempotentKey,
    //     Authorization: `Basic ${encodeSecretKey}`,
    //   },
    //   body: JSON.stringify({
    //     paymentKey: data.paymentKey,
    //     orderId: data.orderId,
    //     amount: data.amount,
    //   }),
    // });
    // if (!request.ok) {
    //   throw new Error('결제 요청에 실패하였습니다.');
    // }

    // const response = await request.json();
    // console.log('결제가 성공적으로 완료되었습니다.', response);
  } catch (error) {
    console.error('결제 요청에 실패하였습니다.', error);
    sendToRetryQueue({ ...data, idempotentKey });
  }
}
