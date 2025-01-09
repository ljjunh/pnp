'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterModal from '@/app/(header-footer)/components/filter/FilterModal';
import Property from '@/app/(header-footer)/components/filter/Property';
import FilterButton from '@/components/common/Button/FilterButton';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { MODAL_ID } from '@/constants/modal';

export default function Filter() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const params = useSearchParams();
  const propertyId = params.get('property');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className={`sticky top-[82px] flex h-[78px] w-full flex-row items-center justify-between bg-white ${isScrolled ? '' : 'mt-24'}`}
      >
        <Property
          propertyId={propertyId}
          params={params}
        />
        <FilterButton />
      </div>
      <ModalProvider modalId={MODAL_ID.ROOM_FILTER}>
        <FilterModal />
      </ModalProvider>
    </>
  );
}
