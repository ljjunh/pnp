'use client';

import { PropsWithChildren } from 'react';
import StoreProvider from '@/app/StoreProvider';

export function Providers({ children }: PropsWithChildren) {
  return (
    //  redux 관련 provider
    <StoreProvider>{children}</StoreProvider>
  );
}
