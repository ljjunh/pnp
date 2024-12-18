'use client';

import { useState } from 'react';
import { ChatContent } from './components/ChatContent';
import { ChatList } from './components/ChatList';
import { ReservationInfo } from './components/ReservationInfo';

export default function Messages() {
  const [showReservation, setShowReservation] = useState<boolean>(true);

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden">
      <ChatList />
      <ChatContent
        showReservation={showReservation}
        onToggleReservation={toggleReservation}
      />
      <ReservationInfo
        showReservation={showReservation}
        onToggleReservation={toggleReservation}
      />
    </div>
  );
}
