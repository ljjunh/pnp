'use client';

import { useState } from 'react';
import { ChatContent } from '@/app/messages/components/ChatContent';
import { ReservationInfo } from '@/app/messages/components/ReservationInfo';
import { FilterItem } from '@/types/message';
import { BsSuitcaseLg } from 'react-icons/bs';
import { BsChatSquare } from 'react-icons/bs';
import { FaAirbnb } from 'react-icons/fa';
import { AllMessageFilter } from './components/message/AllMessageFilter';
import { AllMessageHeader } from './components/message/AllMessageHeader';
import { AllMessageListItem } from './components/message/AllMessageListItem';
import { AllMessageSearchBar } from './components/message/AllMessageSearchBar';

const filterItems: FilterItem[] = [
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
];

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
      <section className="flex w-1/4 flex-col gap-8 px-6 py-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between transition-all duration-300">
            {!showSearchBar ? (
              <AllMessageHeader toggleSearchBar={toggleSearchBar} />
            ) : (
              <AllMessageSearchBar toggleSearchBar={toggleSearchBar} />
            )}
          </div>
          <AllMessageFilter
            showFilter={showFilter}
            toggleFilter={toggleFilter}
            filterItems={filterItems}
          />
        </div>

        {/* 전체 메세지 목록 받아서 보내주기 */}
        <ul>
          <AllMessageListItem />
        </ul>
      </section>

      <section
        className={`flex flex-col border-x transition-all duration-300 ease-in-out ${
          showReservation ? 'w-1/2' : 'w-3/4'
        }`}
      >
        {/* 지난 메세지 내역, 웹소켓 연결해주기 */}
        <ChatContent
          showReservation={showReservation}
          toggleReservation={toggleReservation}
        />
      </section>

      <section
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          showReservation ? 'w-1/4 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        {/* 예약 관련 숙소 정보 보내주기 */}
        <ReservationInfo
          showReservation={showReservation}
          toggleReservation={toggleReservation}
        />
      </section>
    </div>
  );
}
