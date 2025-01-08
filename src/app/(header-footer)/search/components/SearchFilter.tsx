'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterModal from '@/app/(header-footer)/components/filter/FilterModal';
import { cn } from '@/lib/utils';
import { FilterType } from '@/schemas/rooms';
import FilterButton from '@/components/common/Button/FilterButton';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getFilterCount } from '@/apis/filters/action';
import { useToast } from '@/hooks/use-toast';
import { MODAL_ID } from '@/constants/modal';
import { FaAngleDown } from 'react-icons/fa6';

interface SearchFilterProps {
  filter: FilterType;
  sort?: string;
}

export default function SearchFilter({ filter, sort }: SearchFilterProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sorting, setSorting] = useState(() => {
    switch (sort) {
      case 'expensive':
        return '높은 가격 순';
      case 'cheap':
        return '낮은 가격 순';
      default:
        return '관련성 높은 순';
    }
  });
  const [filterCount, setFilterCount] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const handleClick = () => {
    setIsOpen(!isOpen);

    const params = new URLSearchParams(searchParams);

    if (sorting === '관련성 높은 순') {
      params.set('sort', 'recent');
    } else if (sorting === '높은 가격 순') {
      params.set('sort', 'expensive');
    } else if (sorting === '낮은 가격 순') {
      params.set('sort', 'cheap');
    }

    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (!isOpen) return;

    const changeCount = async () => {
      const response = await getFilterCount(filter);

      if (!response.success) {
        switch (response.status) {
          case 500:
            toast({
              title: '네트워크 에러',
              description: response.message,
              variant: 'destructive',
            });
          default:
            toast({
              title: response.message,
              variant: 'destructive',
            });
        }
      }

      if (!response.data) {
        setFilterCount(null);

        return;
      }

      setFilterCount(response.data);
    };

    changeCount();
  }, [filter, isOpen, toast]);

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
                  value={item}
                  aria-label={`${item}으로 정렬`}
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
                  sorting !== '관련성 높은 순' && 'cursor-pointer border-black text-black',
                )}
                onClick={() => setSorting('관련성 높은 순')}
              >
                다시 설정
              </span>
              <button
                className="rounded-lg bg-black px-4 py-2 text-white"
                onClick={handleClick}
              >
                <span>
                  숙소 {filterCount !== null && filterCount > 1000 ? '1000+' : (filterCount ?? 0)}개
                </span>
              </button>
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
