'use client';

import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { IoIosArrowForward } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

export default function RoomCancellationModalButton() {
  const { handleOpenModal, handleCloseModal } = useModal(MODAL_ID.ROOM_CANCELLATION);

  return (
    <>
      <button
        type="button"
        aria-label="숙소 환불 상세 설명 보기"
        onClick={handleOpenModal}
        className="flex items-center text-shade-02 underline hover:text-black"
      >
        더 보기
        <IoIosArrowForward size={19} />
      </button>
      <ModalProvider modalId={MODAL_ID.ROOM_CANCELLATION}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className="relative max-h-[80vh] w-[780px] px-6 pb-8 pt-4"
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
          <h1 className="mb-4 text-2xl">환불 정책</h1>
          <section>
            <div className="mb-2">
              <div className="flex flex-col border-b py-6">
                <span>전액 환불</span>
                <span className="text-shade-02">결제하신 금액이 100% 환불됩니다.</span>
              </div>
              <div className="flex flex-col border-b py-6">
                <span>부분 환불</span>
                <span className="text-shade-02">
                  전체 숙박 요금 중 50%를 환불받으실 수 있습니다. 서비스 수수료는 전액 환불됩니다.
                </span>
              </div>
            </div>
          </section>
          <p className="my-8 text-shade-02">
            체크인 전에 예약을 취소하면 청소비는 언제나 환불됩니다.
          </p>
        </div>
      </ModalProvider>
    </>
  );
}
