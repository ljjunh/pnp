'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import FilterModal from '@/app/(header-footer)/components/filter/FilterModal';
import FilterButton from '@/components/common/Button/FilterButton';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { MODAL_ID } from '@/constants/modal';
import { PROPERTY } from '@/constants/property';
import { BiCategory } from 'react-icons/bi';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';

export default function Filter() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const params = useSearchParams();
  const propertyId = params.get('property');

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);

  const checkScroll = () => {
    const element = scrollRef.current;
    if (element) {
      const isStart = element.scrollLeft === 0;
      const isEnd = element.scrollWidth - element.clientWidth - element.scrollLeft < 1;

      setShowLeftArrow(!isStart);
      setShowRightArrow(!isEnd);
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => element?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: number) => {
    const element = scrollRef.current;
    if (element) {
      const scrollAmount = direction * (64 * 6);
      element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
        className={`flex h-[78px] w-full flex-row items-center justify-between ${isScrolled ? '' : 'mt-24'}`}
      >
        <div className="relative flex flex-1 items-center overflow-hidden">
          {showLeftArrow && (
            <button
              className="absolute left-0 flex h-full items-center justify-center bg-gradient-to-r from-white via-white to-transparent px-2"
              onClick={() => scroll(-1)}
            >
              <CiCircleChevLeft size={30} />
            </button>
          )}
          <div
            ref={scrollRef}
            className="flex flex-1 flex-row items-center gap-6 overflow-x-auto scrollbar-hide"
          >
            {Object.values(PROPERTY).map((content, index) => (
              <Link
                href={`?property=${index}`}
                className={`flex w-16 flex-shrink-0 cursor-pointer flex-col items-center justify-center space-y-1.5 hover:text-black ${propertyId === index.toString() ? 'text-black' : 'text-gray-500'}`}
                key={`${content}-${index}`}
              >
                <BiCategory size={24} />
                <span className="whitespace-nowrap text-xs">{content}</span>
              </Link>
            ))}
          </div>
          {showRightArrow && (
            <button
              onClick={() => scroll(1)}
              className="absolute right-0 flex h-full items-center justify-center bg-gradient-to-l from-white via-white to-transparent"
            >
              <CiCircleChevRight size={30} />
            </button>
          )}
        </div>
        <FilterButton />
      </div>
      <ModalProvider modalId={MODAL_ID.ROOM_FILTER}>
        <FilterModal />
      </ModalProvider>
    </>
  );
}
