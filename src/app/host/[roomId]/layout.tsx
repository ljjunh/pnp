import { ReactNode } from 'react';
import RegisterContextProvider from '@/app/host/[roomId]/components/RegisterContext';
import RegisterFooter from '@/app/host/[roomId]/components/RegisterFooter';
import RegisterFormProvider from '@/app/host/[roomId]/components/RegisterFormProvider';
import RegisterHeader from '@/app/host/[roomId]/components/RegisterHeader';

interface RegisterLayoutProps {
  children: ReactNode;
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <RegisterContextProvider>
      <RegisterHeader />
      <RegisterFormProvider>
        <div className="h-screen px-32 pb-24 pt-[78px]">{children}</div>
        <RegisterFooter />
      </RegisterFormProvider>
    </RegisterContextProvider>
  );
}
