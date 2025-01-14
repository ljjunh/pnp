'use client';

import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import { HiOutlinePhoto } from 'react-icons/hi2';

export default function PhotoUploadModal() {
  const { handleCloseModal } = useModal(MODAL_ID.ROOM_PHOTOS);

  return (
    <div className="w-[700px] px-7 py-4">
      <div className="flex items-center justify-between">
        <FaXmark
          size={40}
          onClick={handleCloseModal}
          className="cursor-pointer p-2 hover:rounded-full hover:bg-neutral-01"
        />
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold">사진 업로드</span>
          <span className="text-neutral-06">선택된 파일 없음</span>
        </div>
        <FaPlus
          size={40}
          className="cursor-pointer p-2 hover:rounded-full hover:bg-neutral-01"
        />
      </div>
      <div className="mt-8 flex h-80 w-full flex-col items-center justify-center space-y-4 rounded-2xl border-2 border-dashed border-neutral-05">
        <HiOutlinePhoto size={100} />
        <span className="text-2xl">사진 끌어다 놓기</span>
        <span>또는 사진 찾아보기</span>
        <button className="rounded-xl bg-black px-8 py-3 text-xl text-white">찾아보기</button>
      </div>
      <hr
        className="mt-6"
        color="LightGray"
      />
      <div className="flex items-center justify-between px-2 pt-4">
        <span className="cursor-pointer rounded-xl px-3 py-1 text-lg hover:bg-neutral-01">
          완료
        </span>
        <button className="rounded-xl bg-black px-8 py-3 text-xl text-white">업로드</button>
      </div>
    </div>
  );
}
