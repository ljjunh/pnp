import { configureStore } from '@reduxjs/toolkit';
import modalReducer, { ModalState } from './features/modal/modalSlice';

// 세션 스토리지에서 상태 로드
const loadState = () => {
  if (typeof window === 'undefined') return undefined;

  try {
    const serializedState = sessionStorage.getItem('reduxState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState) as { modal: ModalState };
  } catch (err) {
    return undefined;
  }
};

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      modal: modalReducer,
    },
    preloadedState: loadState(),
  });

  store.subscribe(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('reduxState', JSON.stringify(store.getState()));
      } catch (error) {
        console.error('상태 저장 중 오류 발생:', error);
      }
    }
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
