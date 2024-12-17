'use client';

import { useEffect } from 'react';
import useTossPayment from '@/hooks/useTosspayment';

const Payment = () => {
  const { widget, isReady } = useTossPayment();

  useEffect(() => {
    async function render() {
      if (widget) {
        if (isReady) {
          return;
        }
        // ------  주문서의 결제 금액 설정 ------
        // TODO: 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
        // TODO: renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
        // @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
        await widget.setAmount({
          currency: 'KRW',
          value: 50000,
        });

        await Promise.all([
          // ------  결제 UI 렌더링 ------
          // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
          widget.renderPaymentMethods({
            selector: '#payment-method',
            // 렌더링하고 싶은 결제 UI의 variantKey
            // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
            // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
            variantKey: 'DEFAULT',
          }),
          // ------  이용약관 UI 렌더링 ------
          // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderagreement
          widget.renderAgreement({
            selector: '#agreement',
            variantKey: 'AGREEMENT',
          }),
        ]);
      }
    }
    render();
  }, [widget]);

  return (
    <div>
      <h1>토스 페이먼츠</h1>
      <div id="payment-method"></div>
      <div id="agreement"></div>
      <button
        className="button"
        style={{ marginTop: '30px' }}
        onClick={async () => {
          try {
            if (!widget) return;
            await widget.requestPayment({
              orderId: '123123123', // 고유 주문 번호
              orderName: '토스 티셔츠 외 2건',
              successUrl: window.location.origin + '/widget/success', // 결제 요청이 성공하면 리다이렉트되는 URL
              failUrl: window.location.origin + '/fail', // 결제 요청이 실패하면 리다이렉트되는 URL
              customerEmail: 'customer123@gmail.com',
              customerName: '김토스',
              // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
              // customerMobilePhone: "01012341234",
            });
          } catch (error) {
            // 에러 처리하기
            console.error(error);
          }
        }}
      >
        결제하기
      </button>
    </div>
  );
};

export default Payment;
