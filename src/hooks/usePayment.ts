import { useState } from 'react';
import PortOne, { PaymentRequest } from '@portone/browser-sdk/v2';

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
    const response = await PortOne.requestPayment({
      storeId: 'store-710ac3bd-2dfc-4c94-a1af-73511e2a6804',
      paymentId: orderId,
      orderName: orderName,
      redirectUrl: 'https://example.com/success',
      totalAmount: amount,
      currency: 'CURRENCY_KRW',
      ...keys,
    } as PaymentRequest);

    if (!response || response.code) {
      console.error(response);
      return;
    }

    const res = await fetch('/api/payment/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentId: response.paymentId,
        orderId,
        amount,
        transactionId: response.txId,
      }),
    });

    console.log(res.json());
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

  return { requestPayment };
};

export default usePayment;
