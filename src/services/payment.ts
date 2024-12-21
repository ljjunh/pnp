import { ServerError } from '@/errors/errors';
import { sendToRetryQueue } from '@/lib/server/queue';
import {
  KakaoPayCreate,
  NaverPayCreate,
  PaymentConfirmData,
  PaymentReady,
  TossPaymentCreate,
} from '@/schemas/payment';
import { v4 as uuidv4 } from 'uuid';
import { KakaoPayLink, ProviderType } from '@/types/payment';

const TOSSPAYMENT_BASE_URL = 'https://api.tosspayments.com';
const KAKAOPAY_BASE_URL = 'https://open-api.kakaopay.com';
const NAVERPAY_BASE_URL = 'https://dev.apis.naver.com';
const encodeSecretKey = Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64');

/**
 * 결제 승인 요청을 처리합니다. (토스, 카카오페이, 네이버페이)
 * 만약, 결제 승인 요청에 실패하면 재시도 큐에 메시지를 전송합니다.
 *
 * @param provider 승인 요청할 결제 서비스
 * @param userId 사용자 식별자
 * @param data
 */
export async function confirmPayment<T extends ProviderType>(
  provider: T,
  userId: string,
  data: PaymentConfirmData[T],
) {
  const idempotentKey = uuidv4();

  try {
    switch (provider) {
      case 'toss':
        return await confirmTossPayment(userId, idempotentKey, data as TossPaymentCreate);
      case 'kakaopay':
        return await confirmKakaoPay(userId, idempotentKey, data as KakaoPayCreate);
      case 'naverpay':
        return await confirmNaverPay(userId, idempotentKey, data as NaverPayCreate);
    }
  } catch (error) {
    try {
      await sendToRetryQueue({ ...data, idempotentKey });
    } catch (retryError) {
      console.error('재시도 큐에 메시지를 전송하는데 실패하였습니다.', retryError);
      throw new Error('결제 요청에 실패하였습니다.');
    }
  }
}

/**
 * 토스 페이먼츠에 실제 결제를 요청합니다.
 * @param {string} userId 사용자 식별자
 * @param {string} idempotentKey 중복 요청 방지를 위한 키
 * @param {TossPaymentCreate} data 결제 요청 데이터
 */
export async function confirmTossPayment(
  userId: string,
  idempotentKey: string,
  data: TossPaymentCreate,
) {
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
    console.error('토스 결제 승인 요청에 실패하였습니다.');
    throw error;
  }
}

/**
 * 네이버페이 결제를 승인합니다.
 * @param {string} userId 사용자 식별자
 * @param {string} idempotentKey 중복 요청 방지를 위한 키
 * @param {NaverPayCreate} data 결제 요청 데이터
 */
export async function confirmNaverPay(userId: string, idempotentKey: string, data: NaverPayCreate) {
  console.log(data);
  ('X-NaverPay-Idempotency-Key');
  try {
    const secretKey = process.env.NAVERPAY_CLIENT_SECRET;
    const chainId = process.env.NEXT_PUBLIC_NAVERPAY_CHAIN_ID;
    const clientId = process.env.NEXT_PUBLIC_NAVERPAY_CLINET_ID;

    if (!secretKey || !chainId || !clientId) {
      console.error('secretKey:', secretKey, ', chainId:', chainId, ', clientId:', clientId);
      throw new ServerError('네이버페이 설정이 잘못되었습니다.');
    }

    const request = await fetch(
      `${NAVERPAY_BASE_URL}/naverpay-partner/naverpay/payments/v2.2/apply/payment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-NaverPay-Idempotency-Key': idempotentKey,
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': secretKey,
          'X-NaverPay-Chain-Id': chainId,
        },
        body: `paymentId=${data.paymentId}`,
      },
    );

    const response = await request.json();

    if (!request.ok) {
      throw new ServerError('네이버페이 결제 요청에 실패하였습니다.');
    }

    console.log('결제가 성공적으로 완료되었습니다.', response);
  } catch (error) {
    console.error('네이버페이 결제 요청에 실패하였습니다.', error);
    throw error;
  }
}

/**
 * 카카오페이 결제를 승인합니다.
 * @param {string} userId 사용자 식별자
 * @param {string} idempotentKey 중복 요청 방지를 위한 키
 * @param {KakaoPayCreate} data 결제 요청 데이터
 */
export async function confirmKakaoPay(userId: string, idempotentKey: string, data: KakaoPayCreate) {
  try {
    const request = await fetch(`${KAKAOPAY_BASE_URL}/online/v1/payment/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `SECRET_KEY ${process.env.KAKAOPAY_CID_SECRET}`,
      },
      body: JSON.stringify({
        cid: 'TC0ONETIME',
        tid: data.tid,
        partner_order_id: data.orderId,
        partner_user_id: userId,
        pg_token: data.pgToken,
      }),
    });

    if (!request.ok) {
      throw new ServerError('카카오페이 결제 승인 요청에 실패하였습니다.');
    }

    const response = await request.json();
    console.log('결제가 성공적으로 완료되었습니다.', response);
  } catch (error) {
    console.error('카카오페이 결제 승인 요청에 실패하였습니다.', error);
    throw error;
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
        Authorization: `SECRET_KEY ${process.env.KAKAOPAY_CID_SECRET}`,
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
