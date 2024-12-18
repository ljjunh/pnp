import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { TossPaymentsInstance, loadTossPayments } from '@tosspayments/payment-sdk';

interface RequestPaymentProps {
  orderId: string;
  orderName: string;
  amount: number;
}

const useTossPayment = () => {
  const { status, data: session } = useSession();
  const [payment, setPayment] = useState<TossPaymentsInstance | null>(null);
  const [isReady, setIsReady] = useState(false);

  const requestPayment = useCallback(
    async ({ orderId, orderName, amount }: RequestPaymentProps) => {
      if (!payment) return;

      try {
        await payment.requestPayment('TOSSPAY', {
          orderId: orderId,
          orderName: orderName,
          amount: amount,
          successUrl: process.env.NEXT_PUBLIC_BASE_URL + '/book/success',
          failUrl: process.env.NEXT_PUBLIC_BASE_URL + '/book/fail',
        });
      } catch (error) {
        console.error('결제 요청에 실패하였습니다.', error);
      }
    },
    [payment],
  );

  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    async function initToss() {
      if (!clientKey) return;
      try {
        const payment = await loadTossPayments(clientKey);
        setPayment(payment);
        setIsReady(true);
      } catch (error) {
        console.error('토스페이먼츠 결제 연동에 실패하였습니다.', error);
        setIsReady(false);
      }
    }

    initToss();

    return () => {
      setPayment(null);
      setIsReady(false);
    };
  }, [session, status]);

  return { payment, isReady, requestPayment };
};

export default useTossPayment;
