import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState, [['zustand/persist', unknown]]>(
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

const { accessToken } = useAuthStore.getState();
export { accessToken };
