'use client';

import { useState } from 'react';
import { Reservation } from '@/types/reservation';
import usePayment, { PaymentType } from '@/hooks/usePayment';

interface PaymentProps {
  orderNumber: Reservation['orderNumber'];
  totalPrice: number;
  title: Reservation['room']['title'];
}

export default function Payment({ orderNumber, totalPrice, title }: PaymentProps) {
  const { isReady, requestPayment } = usePayment();
  const [method, setMethod] = useState<PaymentType>('TRANSFER');

  return (
    <div>
      <h1>토스 페이먼츠</h1>
      {/* Rules */}
      <div className="mt-6">
        <h2 className="mb-4 font-medium">환불 정책</h2>
        <p className="text-sm text-gray-600">
          결제하신 금액이 환불되지 않습니다.
          <button className="ml-2 text-sm underline">자세히 알아보기</button>
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {/* 적계좌이체 */}
        <div
          className={`relative flex cursor-pointer items-center rounded-lg border px-4 py-2 ${method === 'TRANSFER' ? 'bg-gray-200' : ''}`}
          onClick={() => setMethod('TRANSFER')}
        >
          <span>계좌이체</span>
        </div>

        {/* 토스페이 */}
        <div
          className={`relative flex cursor-pointer items-center rounded-lg border px-4 py-2 ${method === 'TOSSPAY' ? 'bg-gray-200' : ''}`}
          onClick={() => setMethod('TOSSPAY')}
        >
          <span>토스페이</span>
        </div>

        {/* 네이버페이 */}
        <div
          className={`relative flex cursor-pointer items-center rounded-lg border px-4 py-2 ${method === 'NAVERPAY' ? 'bg-gray-200' : ''}`}
          onClick={() => setMethod('NAVERPAY')}
        >
          <span>네이버페이</span>
        </div>

        {/* 신용/체크카드 */}
        <div
          className={`relative flex cursor-pointer items-center rounded-lg border px-4 py-2 ${method === 'CARD' ? 'bg-gray-200' : ''}`}
          onClick={() => setMethod('CARD')}
        >
          <span>신용·체크카드</span>
        </div>

        {/* 카카오페이 */}
        <div
          className={`relative flex cursor-pointer items-center rounded-lg border px-4 py-2 ${method === 'KAKAOPAY' ? 'bg-gray-200' : ''}`}
          onClick={() => setMethod('KAKAOPAY')}
        >
          <span>카카오페이</span>
        </div>

        {/* 가상계좌 */}
        <div
          className={`relative flex cursor-pointer items-center rounded-lg border px-4 py-2 ${method === 'VIRTUAL_ACCOUNT' ? 'bg-gray-200' : ''}`}
          onClick={() => setMethod('VIRTUAL_ACCOUNT')}
        >
          <span>가상계좌</span>
        </div>
      </div>
      {/* Submit Button */}
      <button
        disabled={!isReady}
        className="mt-6 w-full rounded-lg bg-[#FF385C] py-3 text-white"
        onClick={() => {
          console.log('클릭되잖아');
          requestPayment(method, {
            orderId: orderNumber,
            orderName: title,
            amount: totalPrice,
          });
        }}
      >
        확인 및 결제
      </button>
    </div>
  );
}
