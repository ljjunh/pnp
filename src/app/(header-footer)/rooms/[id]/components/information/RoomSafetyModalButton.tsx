'use client';

import { Room } from '@/types/room';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { IoIosArrowForward } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

interface RoomSafetyModalProps {
  safetyAmenities: Room['amenities'];
}

export default function RoomSafetyModalButton({ safetyAmenities }: RoomSafetyModalProps) {
  const { handleOpenModal, handleCloseModal } = useModal(MODAL_ID.ROOM_SAFETY);

  return (
    <>
      <button
        type="button"
        aria-label="숙소 안전 규칙 상세 설명 보기"
        onClick={handleOpenModal}
        className="flex items-center text-shade-02 underline hover:text-black"
      >
        더 보기
        <IoIosArrowForward size={19} />
      </button>
      <ModalProvider modalId={MODAL_ID.ROOM_SAFETY}>
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
          <h1 className="mb-4 mt-2 text-2xl">안전 및 숙소</h1>
          <p className="mb-8 text-shade-02">
            나중에 당황하는 일이 없도록 호스트 숙소에 대한 중요 정보를 미리 확인하세요.
          </p>
          <section>
            <div className="mb-2">
              <h2 className="py-4 text-lg">안전 장치</h2>
              {safetyAmenities.map((safetyAmenity) => (
                <div
                  key={safetyAmenity.id}
                  className="flex items-center gap-4 border-b py-6 text-shade-02"
                >
                  {safetyAmenity.title} {safetyAmenity.available ? '있음' : '없음'}
                </div>
              ))}
            </div>
          </section>
        </div>
      </ModalProvider>
    </>
  );
}
