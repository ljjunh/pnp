'use client';

import { Room } from '@/types/room';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { useModal } from '@/hooks/useModal';
import { IoIosArrowForward } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

interface RoomDescriptionButtonProps {
  description: Room['description'];
}

export default function RoomDescriptionButton({ description }: RoomDescriptionButtonProps) {
  const { handleOpenModal, handleCloseModal } = useModal();

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
      <ModalProvider>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="relative max-h-[80vh] w-[780px] px-6 pb-8 pt-4"
        >
          <div className="mb-4 mt-2 inline-block rounded-full p-2 hover:bg-neutral-01">
            <RxCross2
              onClick={handleCloseModal}
              aria-label="모달 닫기"
              className="cursor-pointer"
            />
          </div>
          <h2
            id="modal-title"
            className="mb-8 text-3xl font-bold"
          >
            숙소 설명
          </h2>
          <div className="leading-10">{description}</div>
        </div>
      </ModalProvider>
    </>
  );
}
