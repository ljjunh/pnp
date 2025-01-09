'use client';

import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { RxCross2 } from 'react-icons/rx';

interface RefundDetailModalButtonProps {
  checkIn: string;
  checkOut: string;
}

export function RefundDetailModalButton({ checkIn, checkOut }: RefundDetailModalButtonProps) {
  const { handleOpenModal, handleCloseModal } = useModal(MODAL_ID.REFUND_DETAIL);

  return (
    <>
      <button
        className="cursor-pointer underline"
        onClick={handleOpenModal}
        aria-label="환불 정책 자세히 알아보기"
      >
        자세히 알아보기
      </button>
      <ModalProvider modalId={MODAL_ID.REFUND_DETAIL}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className="relative max-h-[80vh] w-[568px] px-6 pb-8 pt-4"
        >
          <div className="mb-4 mt-2 inline-block rounded-full p-2 hover:bg-neutral-01">
            <RxCross2
              onClick={handleCloseModal}
              aria-label="모달 닫기"
              className="cursor-pointer"
              role="button"
              tabIndex={0}
            />
          </div>
          <h1 className="mb-4 mt-1 text-2xl font-medium">환불 정책</h1>
          <section>
            <div className="mb-5">
              <div className="flex items-start gap-4 border-b py-6 text-shade-02">
                <div className="w-1/4">
                  <p className="font-medium">전</p>
                  <p className="text-[14px]">{checkIn.slice(6)}</p>
                  <p className="text-[14px]">오후 12:00</p>
                </div>
                <div className="w-3/4">
                  <h3 className="font-semibold">부분환불</h3>
                  <p>
                    전체 숙박 요금 중 50%를 환불받으실 수 있습니다. 서비스 수수료는 전액 환불됩니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b py-6 text-shade-02">
                <div className="w-1/4">
                  <p className="font-medium">후</p>
                  <p className="text-[14px]">{checkIn.slice(6)}</p>
                  <p className="text-[14px]">오후 12:00</p>
                </div>
                <div className="w-3/4">
                  <h3 className="font-semibold">부분환불</h3>
                  <p>
                    취소 후 나머지 숙박일에 대한 요금 중 50%를 환불받으실 수 있습니다. 현지 시각
                    기준으로 오후 12:00 후에 취소하면, 해당 날짜에 대한 숙박 요금은 환불되지
                    않습니다. 이미 숙박한 날짜에 대한 요금과 서비스 수수료는 환불되지 않습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b py-6 text-shade-02">
                <div className="w-1/4">
                  <p className="font-medium">후</p>
                  <p className="text-[14px]">{checkOut.slice(6)}</p>
                  <p className="text-[14px]">오후 12:00</p>
                </div>
                <div className="w-3/4">
                  <h3 className="font-semibold">환불불가</h3>
                  <p>결제하신 금액이 환불되지 않습니다.</p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3">체크인 전에 취소를 하면 청소비는 언제나 환불됩니다.</p>
              <p className="cursor-pointer underline">환불 정책 자세히 알아보기</p>
            </div>
          </section>
        </div>
      </ModalProvider>
    </>
  );
}
