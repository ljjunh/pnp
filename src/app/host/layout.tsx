import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';

export default function HostLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}
