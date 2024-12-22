'use client';

import Image from 'next/image';
import { Room } from '@/types/room';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { CgMenuGridO } from 'react-icons/cg';
import { IoIosArrowBack } from 'react-icons/io';

interface RoomGalleryModalButtonProps {
  images: Room['images'];
}

export default function RoomGalleryModalButton({ images }: RoomGalleryModalButtonProps) {
  const { handleOpenModal, handleCloseModal } = useModal(MODAL_ID.ROOM_GALLERY);

  // 이미지를 3개씩 그룹화하는 함수
  const getImageGroups = (images: Room['images']) => {
    const groups = [];
    for (let i = 0; i < images.length; i += 3) {
      groups.push(images.slice(i, i + 3));
    }
    return groups;
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="absolute bottom-6 right-6 flex items-center gap-2 rounded-lg border border-shade-02 bg-shade-01 px-4 py-1.5 hover:brightness-[0.95]"
      >
        <CgMenuGridO size={18} />
        <span className="text-sm">사진 모두 보기</span>
      </button>
      <ModalProvider modalId={MODAL_ID.ROOM_GALLERY}>
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 flex h-screen w-screen flex-col bg-white"
        >
          <div className="ml-4 mt-4 w-fit rounded-full p-2 hover:bg-neutral-01">
            <IoIosArrowBack
              onClick={handleCloseModal}
              aria-label="모달 닫기"
              className="cursor-pointer"
              size={24}
            />
          </div>
          <div className="flex h-full w-full flex-col gap-4 overflow-y-auto px-80 py-10">
            {getImageGroups(images).map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="flex flex-col gap-4"
              >
                {/* 첫 번째 이미지 (큰 이미지) */}
                {group[0] && (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={group[0].imageLink}
                      alt="숙소이미지"
                      fill
                      className="rounded-lg object-cover transition-opacity duration-200 hover:brightness-90"
                    />
                  </div>
                )}

                {/* 두 번째와 세 번째 이미지 (반반 분할) */}
                {(group[1] || group[2]) && (
                  <div className="grid grid-cols-2 gap-4">
                    {group[1] && (
                      <div className="relative aspect-square w-full">
                        <Image
                          src={group[1].imageLink}
                          alt="숙소이미지"
                          fill
                          className="rounded-lg object-cover transition-opacity duration-200 hover:brightness-90"
                        />
                      </div>
                    )}
                    {group[2] && (
                      <div className="relative aspect-square w-full">
                        <Image
                          src={group[2].imageLink}
                          alt="숙소이미지"
                          fill
                          className="rounded-lg object-cover transition-opacity duration-200 hover:brightness-90"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ModalProvider>
    </>
  );
}
