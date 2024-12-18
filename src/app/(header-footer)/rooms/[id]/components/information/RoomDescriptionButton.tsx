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
        onClick={handleOpenModal}
      >
        <span className="underline">더 보기</span>
        <IoIosArrowForward size={19} />
      </button>
      <ModalProvider>
        <div className="relative max-h-[80vh] w-[780px] px-6 pb-8 pt-4">
          <div className="mb-4 mt-2 inline-block rounded-full p-2 hover:bg-neutral-01">
            <RxCross2
              onClick={handleCloseModal}
              className="cursor-pointer"
            />
          </div>
          <h2 className="mb-8 text-3xl font-bold">숙소 설명</h2>
          <div className="leading-10">{description}</div>
        </div>
      </ModalProvider>
    </>
  );
}
