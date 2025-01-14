'use client';

import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';

export default function PhotoUploadButton() {
  const { handleOpenModal } = useModal(MODAL_ID.ROOM_PHOTOS);

  return (
    <button
      className="rounded-xl border-[1.5px] border-black bg-white px-5 py-2.5 hover:bg-neutral-02"
      onClick={handleOpenModal}
    >
      <span className="text-lg">사진 추가하기</span>
    </button>
  );
}
