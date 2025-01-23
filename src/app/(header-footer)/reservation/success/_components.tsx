'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import httpClient from '@/apis/core/httpClient';

export default function Success() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    const paymentKey = searchParams.get('paymentKey');
    const amount = searchParams.get('amount');
    const paymentId = searchParams.get('paymentId');
    const pgToken = searchParams.get('pg_token');

    if (orderId && paymentKey && amount) {
      httpClient.post('/api/payment/confirm/toss', {
        orderId,
        paymentKey,
        amount: Number(amount),
      });
    } else if (paymentId) {
      httpClient.post('/api/payment/confirm/naverpay', {
        paymentId,
      });
    } else if (pgToken) {
      // TODO: 카카오페이 결제 정보 처리 수정
      const kakaopay = JSON.parse(localStorage.getItem('kakaopay') || '{}');
      httpClient.post('/api/payment/confirm/kakaopay', {
        pgToken,
        orderId: kakaopay.orderId,
        tid: kakaopay.tid,
      });
    }
  }, [searchParams]);

  return <div>SuccessPage</div>;
}
