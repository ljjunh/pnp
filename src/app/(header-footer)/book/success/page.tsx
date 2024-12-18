'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { httpClient } from '@/apis/core/httpClient';

export default function SuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    const paymentKey = searchParams.get('paymentKey');
    const amount = searchParams.get('amount');

    httpClient.post('/api/payment', {
      orderId,
      paymentKey,
      amount: Number(amount),
    });
  }, [searchParams]);

  return <div>SuccessPage</div>;
}
