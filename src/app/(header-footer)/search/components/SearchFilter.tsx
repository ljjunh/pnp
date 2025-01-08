'use client';

import { useState } from 'react';
import Link from 'next/link';
import FilterModal from '@/app/(header-footer)/components/filter/FilterModal';
import { cn } from '@/lib/utils';
import FilterButton from '@/components/common/Button/FilterButton';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MODAL_ID } from '@/constants/modal';
import { FaAngleDown } from 'react-icons/fa6';

export default function SearchFilter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sorting, setSorting] = useState<string>('정렬 기준');
  
  return (
    <>
      <div className="sticky top-0 my-4 flex h-full flex-row items-center">
        <FilterButton />
        <div className="mr-3 h-8 w-[1px] bg-neutral-03" />
        <Popover
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <PopoverTrigger className="flex items-center justify-center space-x-2 rounded-full border border-neutral-03 px-5 py-3">
            <span>{sorting}</span>
            <FaAngleDown />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[400px] space-y-4 rounded-2xl p-6"
          >
            {['관련성 높은 순', '낮은 가격 순', '높은 가격 순'].map((item, index) => (
              <label
                className="flex items-center space-x-5"
                key={`${item}-${index}`}
                onClick={() => setSorting(item)}
              >
                <input
                  type="radio"
                  name="sort"
                  value="relevance"
                  checked={sorting === item}
                  // 경고 방지
                  onChange={() => {}}
                  className="h-5 w-5 rounded-full border-2 border-black text-black accent-black focus:ring-black"
                />
                <span>{item}</span>
              </label>
            ))}
            <hr />
            <div className={cn('flex flex-row items-center justify-between')}>
              <span
                className={cn(
                  'cursor-not-allowed border-b border-neutral-03 text-neutral-03',
                  !(sorting === '정렬 기준' || sorting === '관련성 높은 순') &&
                    'cursor-pointer border-black text-black',
                )}
                onClick={() => setSorting('정렬 기준')}
              >
                다시 설정
              </span>
              <Link
                className="rounded-lg bg-black px-4 py-2 text-white"
                href={'/search'}
              >
                <span>
                  {/* 숙소 {filterCount !== null && filterCount > 1000 ? '1000+' : (filterCount ?? 0)}개 */}
                  숙소 1000개 이상 표시
                </span>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
        <div></div>
      </div>
      <ModalProvider modalId={MODAL_ID.ROOM_FILTER}>
        <FilterModal />
      </ModalProvider>
    </>
  );
}
