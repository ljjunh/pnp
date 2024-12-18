'use client';

import useTossPayment from '@/hooks/useTosspayment';

const Payment = () => {
  const { isReady, requestPayment } = useTossPayment();

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
      {/* Submit Button */}
      <button
        disabled={!isReady}
        className="mt-6 w-full rounded-lg bg-[#FF385C] py-3 text-white"
        onClick={() => requestPayment({ orderId: '1234123123', orderName: 'Room Payment' })}
      >
        확인 및 결제
      </button>
    </div>
  );
};

export default Payment;
