'use client';

import { cn } from '@/lib/utils';
import { FilterType } from '@/schemas/rooms';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { RxHamburgerMenu } from 'react-icons/rx';

interface FilterButtonProps {
  params: URLSearchParams;
}

export default function FilterButton({ params }: FilterButtonProps) {
  const { handleOpenModal } = useModal(MODAL_ID.ROOM_FILTER);

  const paramFilter: FilterType = {
    roomType: params.get('roomType') as 'Entire' | 'Private' | null,
    minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : undefined,
    maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
    bedroom: params.get('bedroom') ? Number(params.get('bedroom')) : undefined,
    bed: params.get('bed') ? Number(params.get('bed')) : undefined,
    bathroom: params.get('bathroom') ? Number(params.get('bathroom')) : undefined,
    amenityArray: params.get('amenities')?.split(',') || [],
    option: params.get('option')?.split(',') || [],
    language: params.get('language')?.split(',').map(Number) || [],
  };

  const count = Object.entries(paramFilter).reduce((acc, [, value]) => {
    return acc + (Array.isArray(value) ? value.length : value ? 1 : 0);
  }, 0);

  const isCount = 'border-2 border-black';

  return (
    <div className="relative flex-shrink-0 px-4">
      <button
        className={cn(
          'flex h-12 w-[76px] cursor-pointer flex-row items-center justify-center gap-1.5 rounded-xl border border-neutral-03 py-2.5 hover:border-black hover:bg-neutral-01',
          count > 0 && isCount,
        )}
        onClick={handleOpenModal}
      >
        <RxHamburgerMenu size={16} />
        <span className="text-xs font-semibold">필터</span>
      </button>
      {count > 0 && (
        <span className="absolute -top-1.5 right-3 rounded-full bg-black px-1.5 text-sm text-white">
          {count}
        </span>
      )}
    </div>
  );
}
