'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { RegisterResponse } from '@/types/room';

export interface RoomState {
  room: RegisterResponse | null;
  setRoom: (room: RegisterResponse) => void;
  clearRoom: () => void;
}

export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      room: null,
      setRoom: (room: RegisterResponse) => set({ room }),
      clearRoom: () => set({ room: null }),
    }),
    {
      name: 'room-store',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => sessionStorage) : undefined,
    },
  ),
);
