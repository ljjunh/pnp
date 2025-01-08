'use client';

import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function FilterButton() {
  const { handleOpenModal } = useModal(MODAL_ID.ROOM_FILTER);

  return (
    <div className="flex-shrink-0 px-4">
      <button
        className="flex h-12 w-[76px] cursor-pointer flex-row items-center justify-center gap-1.5 rounded-xl border border-neutral-03 py-2.5 hover:border-black hover:bg-neutral-01"
        onClick={handleOpenModal}
      >
        <RxHamburgerMenu size={16} />
        <span className="text-xs font-semibold">필터</span>
      </button>
    </div>
  );
}
