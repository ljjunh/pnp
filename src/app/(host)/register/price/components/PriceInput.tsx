'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { BiSolidPencil } from 'react-icons/bi';

interface PriceInputProps {
  initPrice: number;
}

export default function PriceInput({ initPrice }: PriceInputProps) {
  const [price, setPrice] = useState<number>(initPrice);
  const [open, setOpen] = useState<string>('');
  const { handleOpenModal } = useModal(MODAL_ID.ROOM_PRICE_INFO);

  const handleGuestPrice = () => {
    return Math.floor(price * 1.1);
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center py-20">
      <div className="flex items-center space-x-2 text-xl font-bold">
        <span>₩</span>
        <input
          type="number"
          className="focus:outline-none"
          defaultValue={price.toLocaleString()}
          onChange={(e) => setPrice(Number(e.target.value))}
          id="price"
        />
        <label
          className="flex cursor-pointer items-center justify-center rounded-full border border-neutral-02 p-2"
          htmlFor="price"
        >
          <BiSolidPencil size={24} />
        </label>
      </div>
      <Accordion
        type="single"
        collapsible
        className="mt-4 h-[300px] w-80"
        value={open}
        onValueChange={setOpen}
      >
        <AccordionItem value="price">
          <AccordionContent className="w-full space-y-4">
            <div className="flex flex-col space-y-4 rounded-xl border-2 border-black px-3 py-4 text-lg">
              <div className="flex justify-between">
                <span>기본 요금</span>
                <span>₩{price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>게스트 서비스 수수료</span>
                <span>₩{Math.floor(price * 0.1).toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>게스트 지불 요금</span>
                <span>₩{Math.floor(price * 1.1).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex justify-between rounded-xl border-2 border-neutral-03 px-3 py-4 text-lg">
              <span>호스트 수입</span>
              <span>₩{price.toLocaleString()}</span>
            </div>
          </AccordionContent>
          <AccordionTrigger className="text-lg">
            {open === 'price'
              ? '접기'
              : `게스트 지불 요금: ₩${Math.floor(price * 1.1).toLocaleString()}`}
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
      <span
        className="mt-6 cursor-pointer border-b border-neutral-07 text-neutral-07"
        onClick={handleOpenModal}
      >
        요금 책정에 대해 자세히 알아보기
      </span>
    </div>
  );
}
