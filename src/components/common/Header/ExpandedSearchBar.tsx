'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchType } from '@/schemas/rooms';
import SearchDate from './SearchDate';
import SearchGuest from './SearchGuest';
import SearchLocation from './SearchLocation';

export type Section = 'location' | 'checkIn' | 'checkOut' | 'guests';

export default function ExpandedSearchBar() {
  const params = useSearchParams();

  const searchData: SearchType = {
    location: params.get('location') ?? undefined,
    checkIn: params.get('checkIn') ?? undefined,
    checkOut: params.get('checkOut') ?? undefined,
    capacity: params.get('capacity') ? Number(params.get('capacity')) : 0,
  };

  const [section, setSection] = useState<Section | null>(null);
  const [filter, setFilter] = useState<SearchType>(searchData);
 
  const handleSearchFilter = <K extends keyof SearchType>(
    newState: SearchType[K],
    type: keyof SearchType,
  ) => {
    setFilter((prev) => ({ ...prev, [type]: newState }));
  };

  useEffect(() => {
    console.log('filter', filter);
  }, [filter]);

  return (
    <div
      role="search"
      aria-label="숙소 검색"
      className="mx-auto flex w-full max-w-[1000px] justify-center"
    >
      <div className="w-full cursor-pointer rounded-full border-[1px] bg-white shadow-sm transition-all hover:shadow-md">
        <div className={`flex justify-between rounded-full ${section ? 'bg-neutral-02' : ''}`}>
          {/* 여행지 */}
          <SearchLocation
            section={section}
            location={filter.location}
            setSection={setSection}
            handleSearchFilter={handleSearchFilter}
          />

          <div className="h-10 w-[1px] self-center bg-neutral-04" />

          {/* 체크인, 체크아웃 */}
          <SearchDate
            section={section}
            setSection={setSection}
            checkIn={filter.checkIn}
            checkOut={filter.checkOut}
            handleSearchFilter={handleSearchFilter}
          />

          <div className="h-10 w-[1px] self-center bg-neutral-04" />

          {/* 여행자 & 검색 버튼 */}
          <SearchGuest
            section={section}
            setSection={setSection}
            filter={filter}
            handleSearchFilter={handleSearchFilter}
          />
        </div>
      </div>
    </div>
  );
}
