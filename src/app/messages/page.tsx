'use client';

import { useState } from 'react';

export default function Messages() {
  const [showReservation, setShowReservation] = useState<boolean>(true);

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden">
      <div className="w-1/4 px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">메시지</h1>
          <div className="flex gap-1">
            <div>돋보기 아이콘</div>
            <div>필터 아이콘</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button>필터 버튼</button>
          <button>읽지 않음</button>
        </div>
        <div>채팅 목록</div>
      </div>
      <div
        className={`flex flex-col border-x transition-all duration-300 ease-in-out ${showReservation ? 'w-1/2' : 'w-3/4'}`}
      >
        <div className="flex h-20 items-center justify-between border-b px-8 py-6">
          <div className="flex gap-1">
            <div>호스트 프로필 사진</div>
            <h1 className="text-2xl">호스트 이름</h1>
          </div>
          {showReservation ? null : <button onClick={toggleReservation}>예약보기</button>}
        </div>
        <div className="flex-1 overflow-y-scroll px-8 py-6">채팅 내역</div>
        <div className='h-14 px-8'>검색 창</div>
      </div>
      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          showReservation ? 'w-1/4 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b px-8 py-6">
          <h1 className="text-2xl">예약</h1>
          <button onClick={toggleReservation}>X</button>
        </div>
        <div className="flex-1 overflow-y-scroll px-8 py-6">숙소 정보</div>
      </div>
    </div>
  );
}
