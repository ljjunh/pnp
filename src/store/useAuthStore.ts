import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface authState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<authState, [['zustand/persist', unknown]]>(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken: string) => set({ accessToken }),
      clearTokens: () => set({ accessToken: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
