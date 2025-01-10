'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterModal from '@/app/(header-footer)/components/filter/FilterModal';
import Property from '@/app/(header-footer)/components/filter/Property';
import FilterButton from '@/components/common/Button/FilterButton';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { MODAL_ID } from '@/constants/modal';

export default function Filter() {
  const ref = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const params = useSearchParams();
  const propertyId = params.get('property');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      if (ref.current) {
        ref.current.style.top = document.querySelector('header')?.offsetHeight + 'px';
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      if (ref.current) {
        ref.current.style.top = document.querySelector('header')?.offsetHeight + 'px';
      }
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={`sticky top-[82px] z-10 flex h-[78px] w-full flex-row items-center justify-between bg-white ${isScrolled ? '' : 'mt-24'}`}
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
