import { ReactNode } from 'react';
import RegisterContextProvider from './components/RegisterContext';
import RegisterFooter from './components/RegisterFooter';
import RegisterFormProvider from './components/RegisterFormProvider';
import RegisterHeader from './components/RegisterHeader';

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
