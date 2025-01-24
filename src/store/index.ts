'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthState, createAuthSlice } from './slices/authSlice';

export const useStore = create<AuthState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: 'auth-store',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => sessionStorage) : undefined,
    },
  ),
);
