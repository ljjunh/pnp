'use client';

import { useCallback, useEffect, useState } from 'react';
import { RegisterResponse } from '@/types/room';
import { useAuthStore } from '@/store/useAuthStore';
import { useRoomStore } from '@/store/useRoomStore';

export function useRegisterRoom(roomId: number) {
  const [room, setRoom] = useState<RegisterResponse | undefined>();
  const { room: initialRoom } = useRoomStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useRoomStore.persist.hasHydrated();

  const getRoom = useCallback(async () => {
    const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const response = await request.json();

    setRoom(() => response.data);
  }, [accessToken, roomId]);

  useEffect(() => {
    if (hasHydrated) {
      if (initialRoom) {
        setRoom(initialRoom);
      } else {
        getRoom();
      }
    }
  }, [hasHydrated, getRoom, initialRoom]);

  return { room };
}
