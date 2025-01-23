import { useState } from 'react';
import PortOne, { PaymentRequest } from '@portone/browser-sdk/v2';
import httpClient from '@/apis/core/httpClient';

interface RequestPaymentProps {
  orderId: string;
  orderName: string;
  amount: number;
}
type PaymentMethod = PaymentRequest['payMethod'];

export type PaymentType =
  | 'CARD'
  | 'TRANSFER'
  | 'VIRTUAL_ACCOUNT'
  | 'MOBILE'
  | 'EASY_PAY'
  | 'KAKAOPAY'
  | 'NAVERPAY';

enum PaymentStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

const usePayment = () => {
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.IDLE);

  const requestPayment = async (
    method: PaymentType,
    { orderId, orderName, amount }: RequestPaymentProps,
  ) => {
    setStatus(PaymentStatus.LOADING);

    const keys = parsePaymentMethod(method);
    const portone = await PortOne.requestPayment({
      storeId: 'store-710ac3bd-2dfc-4c94-a1af-73511e2a6804',
      paymentId: orderId,
      orderName: orderName,
      totalAmount: amount,
      currency: 'CURRENCY_KRW',
      ...keys,
    } as PaymentRequest);

    if (!portone || portone.code) {
      // TODO: 결제 실패 로직 처리
      console.error('결제 요청에 실패하였습니다.', portone?.message);
      setStatus(PaymentStatus.ERROR);
      return;
    }

    const response = await httpClient.post('/payment/confirm', {
      paymentId: portone.paymentId,
      orderId,
      amount,
      transactionId: portone.txId,
    });

    if (response.status === 200) {
      setStatus(PaymentStatus.SUCCESS);
      // TODO: 결제 성공 시 처리
      return;
    }
  };

  const parsePaymentMethod = (
    method: PaymentType,
  ): {
    channelKey: string;
    payMethod: PaymentMethod;
    easyPay?: { easyPayProvider: string };
  } => {
    if (method === 'KAKAOPAY') {
      return {
        channelKey: process.env.NEXT_PUBLIC_PORTONE_KAKAOPAY!,
        payMethod: 'EASY_PAY',
      };
    } else if (method === 'EASY_PAY') {
      return {
        channelKey: process.env.NEXT_PUBLIC_PORTONE_TOSSPAY!,
        easyPay: {
          easyPayProvider: 'EASY_PAY_PROVIDER_TOSSPAY',
        },
        payMethod: 'EASY_PAY',
      };
    } else if (method === 'NAVERPAY') {
      return {
        channelKey: process.env.NEXT_PUBLIC_PORTONE_TOSSPAY!,
        easyPay: {
          easyPayProvider: 'EASY_PAY_PROVIDER_NAVERPAY',
        },
        payMethod: 'EASY_PAY',
      };
    }
    return {
      channelKey: process.env.NEXT_PUBLIC_PORTONE_TOSSPAY!,
      payMethod: method,
    };
  };

  return { status, requestPayment };
};

export default usePayment;
