'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Property from '@/app/(header-footer)/components/filter/Property';
import { RiHome9Line } from 'react-icons/ri';

export default function SearchProperty() {
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

  const handleParams = (id: number | null) => {
    const newURL = new URLSearchParams(params.toString());

    if (id !== null) {
      newURL.set('property', id.toString());
    } else {
      newURL.delete('property');
    }

    return newURL.toString();
  };

  return (
    <>
      <div
        className={`flex h-[78px] w-full flex-row items-center justify-between ${isScrolled ? '' : 'mt-24'}`}
      >
        <Link
          href={`?${handleParams(null)}`}
          className={`flex w-16 flex-shrink-0 cursor-pointer flex-col items-center justify-center space-y-1.5 hover:text-black ${propertyId === null ? 'text-black' : 'text-gray-500'}`}
        >
          <RiHome9Line size={24} />
          <span className="whitespace-nowrap text-xs">검색 결과</span>
        </Link>
        <hr className="mx-5 h-4/5 border border-neutral-03" />
        <Property
          propertyId={propertyId}
          params={params}
        />
      </div>
    </>
  );
}
