'use client';

import { StateCreator } from 'zustand';

export interface AuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearTokens: () => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  accessToken: null,
  setAccessToken: (accessToken: string) => set({ accessToken }),
  clearTokens: () => set({ accessToken: null }),
});
