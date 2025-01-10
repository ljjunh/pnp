'use client';

import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { FaXmark } from 'react-icons/fa6';

export default function PriceModalCloseButton() {
  const { handleCloseModal } = useModal(MODAL_ID.ROOM_PRICE_INFO);

  return (
    <FaXmark
      size={40}
      onClick={handleCloseModal}
      className="absolute left-0 top-0 cursor-pointer p-2 hover:rounded-full hover:bg-neutral-01"
    />
  );
}
