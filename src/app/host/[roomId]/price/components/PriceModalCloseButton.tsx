'use client';

import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { FaXmark } from 'react-icons/fa6';

export default function PriceModalCloseButton() {
  const { handleCloseModal } = useModal(MODAL_ID.ROOM_PRICE_INFO);

  return (
    <button
      type="button"
      onClick={handleCloseModal}
      aria-label="가격 정보 모달 닫기"
      className="absolute left-0 top-0 p-1 hover:rounded-full hover:bg-neutral-01"
    >
      <FaXmark
        size={24}
        aria-hidden="true"
      />
    </button>
  );
}
