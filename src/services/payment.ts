import { ServerError } from '@/errors/errors';
import { sendToRetryQueue } from '@/lib/server/queue';
import { PaymentCreate, PaymentReady } from '@/schemas/payment';
import { KakaoPayLink } from '@/types/payment';

const TOSSPAYMENT_BASE_URL = 'https://api.tosspayments.com';
const KAKAOPAY_BASE_URL = 'https://open-api.kakaopay.com';
const NAVERPAY_BASE_URL = 'https://dev.apis.naver.com';
const encodeSecretKey = Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64');

/**
 * 토스 페이먼츠에 실제 결제를 요청합니다.
 * @param {string} userId 사용자 식별자
 * @param {PaymentCreate} data 결제 요청 데이터
 */
export async function createPayment(userId: string, data: PaymentCreate) {
  const idempotentKey = `${userId}-${data.orderId}`;
  const errorHeader: HeadersInit = data.error
    ? {
        'TossPayments-Test-Code': data.error,
      }
    : {};

  try {
    const request = await fetch(`${TOSSPAYMENT_BASE_URL}/v1/payments/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotentKey,
        Authorization: `Basic ${encodeSecretKey}`,
        ...errorHeader,
      },
      body: JSON.stringify({
        paymentKey: data.paymentKey,
        orderId: data.orderId,
        amount: data.amount,
      }),
    });
    if (!request.ok) {
      throw new Error('결제 요청에 실패하였습니다.');
    }

    const response = await request.json();
    console.log('결제가 성공적으로 완료되었습니다.', response);
  } catch (error) {
    console.error(error);

    console.error('결제 요청에 실패하였습니다.', error);
    try {
      await sendToRetryQueue({ ...data, idempotentKey });
    } catch (retryError) {
      console.error('재시도 큐에 메시지를 전송하는데 실패하였습니다.', retryError);
      throw new Error('결제 요청에 실패하였습니다.');
    }
  }
}

/**
 * 카카오페이 결제 링크를 생성합니다.
 *
 * @param {string} userId 유저 ID
 * @param {PaymentReady} data 카카오페이 결제 요청 데이터
 */
export async function createKakaoPayLink(
  userId: string,
  data: PaymentReady,
): Promise<KakaoPayLink> {
  try {
    const request = await fetch(`${KAKAOPAY_BASE_URL}/online/v1/payment/ready`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `SECRET_KEY ${process.env.NEXT_PUBLIC_KAKAOPAY_CID_SECRET}`,
      },
      body: JSON.stringify({
        cid: 'TC0ONETIME',
        partner_order_id: data.orderId,
        partner_user_id: userId,
        item_name: data.orderName,
        quantity: 1,
        total_amount: data.amount,
        tax_free_amount: 0,
        approval_url: process.env.NEXT_PUBLIC_BASE_URL + '/book/success',
        cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/book/fail',
        fail_url: process.env.NEXT_PUBLIC_BASE_URL + '/book/fail',
      }),
    });

    if (!request.ok) {
      throw new ServerError('카카오페이 결제 요청에 실패하였습니다.');
    }

    const response = await request.json();

    return {
      tid: response.tid,
      pcLink: response.next_redirect_pc_url,
      mobileLink: response.next_redirect_mobile_url,
      appLink: response.next_redirect_app_url,
      androidLink: response.android_app_scheme,
      iosLink: response.ios_app_scheme,
    };
  } catch (error) {
    console.error('카카오페이 결제 요청에 실패하였습니다.', error);
    throw error;
  }
}
