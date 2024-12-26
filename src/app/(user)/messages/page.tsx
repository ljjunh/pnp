'use client';

import { useState } from 'react';
import { ReservationContent } from '@/app/(user)/components/reservation/ReservationContent';
import { ReservationHeader } from '@/app/(user)/components/reservation/ReservationHeader';
import { AllMessageFilter } from '@/app/(user)/messages/components/AllMessageFilter';
import { AllMessageHeader } from '@/app/(user)/messages/components/AllMessageHeader';
import { AllMessageListItem } from '@/app/(user)/messages/components/AllMessageListItem';
import { AllMessageSearchBar } from '@/app/(user)/messages/components/AllMessageSearchBar';
import { MessageContent } from '@/app/(user)/messages/components/MessageContent';
import { MessageHeader } from '@/app/(user)/messages/components/MessageHeader';
import { MessageInput } from '@/app/(user)/messages/components/MessageInput';
import { FilterItem } from '@/types/message';
import { BsSuitcaseLg } from 'react-icons/bs';
import { BsChatSquare } from 'react-icons/bs';
import { FaAirbnb } from 'react-icons/fa';

export const filterItems = [
  {
    id: 1,
    label: '전체',
    icon: BsChatSquare,
  },
  {
    id: 2,
    label: '여행',
    icon: BsSuitcaseLg,
  },
  {
    id: 3,
    label: '지원',
    icon: FaAirbnb,
  },
] as const satisfies FilterItem[];

export default function Messages() {
  const [showReservation, setShowReservation] = useState<boolean>(true);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden">
      <section
        className="flex w-1/4 flex-col gap-8 px-6 py-6"
        aria-label="메시지 목록"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between transition-all duration-300">
            {!showSearchBar ? (
              // 전체 메세지 목록 헤더
              <AllMessageHeader toggleSearchBar={toggleSearchBar} />
            ) : (
              // 전체 메세지 목록 검색창
              <AllMessageSearchBar toggleSearchBar={toggleSearchBar} />
            )}
          </div>
          {/* 전체 메세지 목록 필터 */}
          <AllMessageFilter
            showFilter={showFilter}
            toggleFilter={toggleFilter}
            filterItems={filterItems}
          />
        </div>

        {/* 전체 메세지 목록 받아서 보내주기 */}
        <ul
          role="list"
          aria-label="대화 목록"
        >
          <AllMessageListItem />
        </ul>
      </section>

      <section
        className={`flex flex-col border-x transition-all duration-300 ease-in-out ${
          showReservation ? 'w-1/2' : 'w-3/4'
        }`}
      >
        {/* 메세지 헤더 */}
        <MessageHeader
          showReservation={showReservation}
          toggleReservation={toggleReservation}
        />
        {/* 지난 메세지 내역, 웹소켓 연결해주기 */}
        <MessageContent />
        {/* 메세지 입력창 */}
        <MessageInput />
      </section>

      <section
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          showReservation ? 'w-1/4 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <ReservationHeader toggleReservation={toggleReservation} />

        {/* 예약 관련 숙소 정보 보내주기 */}
        <ReservationContent />
      </section>
    </div>
  );
}
