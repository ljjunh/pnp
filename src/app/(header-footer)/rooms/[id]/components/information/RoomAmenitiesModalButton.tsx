'use client';

import Image from 'next/image';
import { Room } from '@/types/room';
import Button from '@/components/common/Button/Button';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { RxCross2 } from 'react-icons/rx';

interface RoomAmenitiesModalButtonProps {
  amenities: Room['amenities'];
}

export default function RoomAmenitiesModalButton({ amenities }: RoomAmenitiesModalButtonProps) {
  const { modalState, handleOpenModal, handleCloseModal } = useModal(MODAL_ID.ROOM_AMENITIES);

  return (
    <>
      <Button
        variant="tertiary"
        onClick={handleOpenModal}
        aria-expanded={modalState}
        aria-controls={MODAL_ID.ROOM_AMENITIES}
      >
        편의시설 {amenities.length}개 모두 보기
      </Button>
      <ModalProvider modalId={MODAL_ID.ROOM_AMENITIES}>
        <div className="relative max-h-[80vh] w-[780px] px-6 pb-8 pt-4">
          <div className="mb-4 mt-2 inline-block rounded-full p-2 hover:bg-neutral-01">
            <RxCross2
              onClick={handleCloseModal}
              aria-label="모달 닫기"
              className="cursor-pointer"
            />
          </div>
          <h2 className="mb-8 text-2xl">숙소 편의시설</h2>
          <div className="flex flex-col">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex gap-3 border-b py-4"
              >
                <Image
                  src={`/icons/${amenity.icon}.svg`}
                  alt={amenity.title}
                  width={25}
                  height={25}
                  onError={(e) => {
                    e.currentTarget.src = '/icons/SYSTEM_SHAMPOO.svg';
                  }}
                />
                <span
                  className={`text-lg ${amenity.category === '숙소에 없는 시설' ? 'line-through' : ''}`}
                >
                  {amenity.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ModalProvider>
    </>
  );
}
