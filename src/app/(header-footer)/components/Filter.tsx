'use client';

import FilterButton from '@/components/common/Button/FilterButton';
import FilterModal from '@/app/(header-footer)/components/Filter/FilterModal';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';

export default function Filter() {
  return (
    <>
      <div className="flex h-[78px] flex-row items-center justify-between">
        <p>필터 아이콘들 들어갈 자리</p>
        <FilterButton />
      </div>
      <ModalProvider>
        <FilterModal />
      </ModalProvider>
    </>
  );
}
