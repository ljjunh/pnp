import { useCallback, useEffect, useState } from 'react';
import { TossPaymentsInstance, loadTossPayments } from '@tosspayments/payment-sdk';
import { PaymentMethodCode } from '@tosspayments/payment__types';

interface RequestPaymentProps {
  orderId: string;
  orderName: string;
  amount: number;
}

interface NaverPay {
  open: (params: {
    merchantPayKey: string;
    productName: string;
    totalPayAmount: number;
    taxScopeAmount: number;
    taxExScopeAmount: number;
    returnUrl: string;
  }) => void;
}

declare global {
  interface Window {
    Naver: {
      Pay: {
        create: (options: {
          clientId: string;
          chainId: string;
          mode: 'development' | 'production';
          openType: 'popup' | 'iframe';
        }) => NaverPay;
      };
    };
  }
}

export type PaymentType = PaymentMethodCode | 'KAKAOPAY' | 'NAVERPAY';

const usePayment = () => {
  // const { status, data: session } = useSession();
  const [toss, setToss] = useState<TossPaymentsInstance | null>(null);
  const [naver, setNaver] = useState<NaverPay | null>(null);
  const [isReady, setIsReady] = useState(false);

  const requestPayment = useCallback(
    async (method: PaymentType, { orderId, orderName, amount }: RequestPaymentProps) => {
      if (method !== 'KAKAOPAY' && method !== 'NAVERPAY') {
        await requestTossPay(method as PaymentMethodCode, { orderId, orderName, amount });
      } else if (method === 'KAKAOPAY') {
        await requestKakaoPay({ orderId, orderName, amount });
      } else if (method === 'NAVERPAY') {
        await requestNaverPay({ orderId, orderName, amount });
      }
    },
    [toss, naver],
  );

  /**
   * 카카오페이 결제 요청
   *
   * @param orderId 주문번호
   * @param orderName 주문명
   * @param amount 결제금액
   */
  const requestKakaoPay = useCallback(async function ({
    orderId,
    orderName,
    amount,
  }: RequestPaymentProps) {
    const params = new URLSearchParams({
      name: 'KAKAOPAY',
      orderId: orderId,
      amount: String(amount),
      orderName: orderName,
    });
    const response = await fetch('/api/payment?' + params.toString());

    if (!response.ok) {
      console.error('카카오페이 결제 준비에 실패하였습니다.');
      return;
    }

    const {
      data: { link, tid },
    } = await response.json();
    localStorage.setItem(
      'kakaopay',
      JSON.stringify({
        tid,
        orderId,
        orderName,
      }),
    );
    window.open(link, '_blank', 'noopener,noreferrer');
  }, []);

  /**
   * 토스페이먼츠 결제 요청
   *
   * @param method 결제 수단
   * @param orderId 주문번호
   * @param orderName 주문명
   * @param amount 결제금액
   */
  const requestTossPay = useCallback(
    async function (
      method: PaymentMethodCode,
      { orderId, orderName, amount }: RequestPaymentProps,
    ) {
      if (!toss) return;

      try {
        await toss.requestPayment(method, {
          orderId: orderId,
          orderName: orderName,
          amount: amount,
          successUrl: process.env.NEXT_PUBLIC_BASE_URL + '/reservation/success',
          failUrl: process.env.NEXT_PUBLIC_BASE_URL + '/reservation/fail',
        });
      } catch (error) {
        console.error('결제 요청에 실패하였습니다.', error);
      }
    },
    [toss],
  );

  /**
   * 네이버페이 결제 요청
   *
   * @param orderId 주문번호
   * @param orderName 주문명
   * @param amount 결제금액
   */
  const requestNaverPay = useCallback(
    async function ({ orderId, orderName, amount }: RequestPaymentProps) {
      if (!naver) return;

      naver.open({
        merchantPayKey: orderId,
        productName: orderName,
        totalPayAmount: amount,
        taxScopeAmount: 0,
        taxExScopeAmount: amount,
        returnUrl: process.env.NEXT_PUBLIC_BASE_URL + '/book/success',
      });
    },
    [naver],
  );

  useEffect(function initialize() {
    async function initToss() {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
      if (!clientKey) return;
      try {
        const toss = await loadTossPayments(clientKey);
        setToss(toss);
      } catch (error) {
        console.error('토스 결제 모듈 연동에 실패하였습니다.', error);
        throw error;
      }
    }

    async function initNaver() {
      const clientId = process.env.NEXT_PUBLIC_NAVERPAY_CLINET_ID;
      const chainId = process.env.NEXT_PUBLIC_NAVERPAY_CHAIN_ID;
      if (!clientId || !chainId) return;
      try {
        const naver = window.Naver.Pay.create({
          clientId: clientId,
          chainId: chainId,
          mode: 'development',
          openType: 'popup',
        });
        setNaver(naver);
      } catch (error) {
        console.error('네이버 페이 결제 모듈 연동에 실패하였습니다.', error);
        throw error;
      }
    }

    Promise.all([initToss(), initNaver()])
      .then(() => setIsReady(true))
      .catch(() => setIsReady(false));

    return () => {
      setToss(null);
      setNaver(null);
      setIsReady(false);
    };
  }, []);

  return { isReady, requestPayment };
};

export default usePayment;
