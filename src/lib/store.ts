import authReducer, { AuthState } from '@/lib/features/auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';

// 세션 스토리지에서 상태 로드
const loadState = () => {
  if (typeof window === 'undefined') return undefined;

  try {
    const serializedState = sessionStorage.getItem('reduxState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState) as { auth: AuthState };
  } catch (err) {
    return undefined;
  }
};

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: loadState(),
  });

  store.subscribe(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('reduxState', JSON.stringify(store.getState()));
    }
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
