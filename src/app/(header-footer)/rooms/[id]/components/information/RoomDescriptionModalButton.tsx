'use client';

import { Room } from '@/types/room';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { IoIosArrowForward } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

interface RoomDescriptionModalButtonProps {
  description: Room['description'];
}

export default function RoomDescriptionModalButton({
  description,
}: RoomDescriptionModalButtonProps) {
  const { handleOpenModal, handleCloseModal } = useModal(MODAL_ID.ROOM_DESCRIPTION);

  return (
    <>
      <button
        type="button"
        className="mt-4 flex items-center"
        aria-label="숙소 상세 설명 보기"
        onClick={handleOpenModal}
      >
        <span className="underline">더 보기</span>
        <IoIosArrowForward size={19} />
      </button>
      <ModalProvider modalId={MODAL_ID.ROOM_DESCRIPTION}>
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
          <h2
            id="modal-title"
            className="mb-8 text-3xl font-bold"
          >
            숙소 설명
          </h2>
          <div
            id="modal-description"
            className="leading-10"
          >
            {description}
          </div>
        </div>
      </ModalProvider>
    </>
  );
}
