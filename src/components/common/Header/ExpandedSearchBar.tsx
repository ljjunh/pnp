'use client';

import { useState } from 'react';
import SearchDate from './SearchDate';
import SearchGuest from './SearchGuest';
import SearchLocation from './SearchLocation';

export type Section = 'location' | 'checkIn' | 'checkOut' | 'guests';

export default function ExpandedSearchBar() {
  const [section, setSection] = useState<Section | null>(null);

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
            setSection={setSection}
          />

          <div className="h-10 w-[1px] self-center bg-neutral-04" />

          {/* 체크인, 체크아웃 */}
          <SearchDate
            section={section}
            setSection={setSection}
          />

          <div className="h-10 w-[1px] self-center bg-neutral-04" />

          {/* 여행자 & 검색 버튼 */}
          <SearchGuest
            section={section}
            setSection={setSection}
          />
        </div>
      </div>
    </div>
  );
}
