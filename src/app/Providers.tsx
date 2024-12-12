'use client';

import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import StoreProvider from '@/app/StoreProvider';

export function Providers({ children }: PropsWithChildren) {
  return (
    // auth 관련 provider
    <SessionProvider>
      {/* redux 관련 provider */}
      <StoreProvider>{children}</StoreProvider>
    </SessionProvider>
  );
}
