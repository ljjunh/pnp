'use client';

import { useState } from 'react';

export default function Messages() {
  const [showReservation, setShowReservation] = useState<boolean>(true);

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden">
      <section className="w-1/4 px-8 py-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl">메시지</h1>
          <div className="flex gap-1">
            <div>돋보기 아이콘</div>
            <div>필터 아이콘</div>
          </div>
        </header>
        <div className="flex gap-2">
          <button>필터 버튼</button>
          <button>읽지 않음</button>
        </div>
        <ul>채팅 목록</ul>
      </section>
      <section
        className={`flex flex-col border-x transition-all duration-300 ease-in-out ${showReservation ? 'w-1/2' : 'w-3/4'}`}
      >
        <header className="flex h-20 items-center justify-between border-b px-8 py-6">
          <div className="flex gap-1">
            <div>호스트 프로필 사진</div>
            <h1 className="text-2xl">호스트 이름</h1>
          </div>
          {showReservation ? null : <button onClick={toggleReservation}>예약보기</button>}
        </header>
        <div className="flex-1 overflow-y-scroll px-8 py-6">채팅 내역</div>
        <div className="h-14 px-8">검색 창</div>
      </section>
      <section
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          showReservation ? 'w-1/4 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <header className="flex h-20 items-center justify-between border-b px-8 py-6">
          <h1 className="text-2xl">예약</h1>
          <button onClick={toggleReservation}>X</button>
        </header>
        <div className="flex-1 overflow-y-scroll px-8 py-6">숙소 정보</div>
      </section>
    </div>
  );
}
