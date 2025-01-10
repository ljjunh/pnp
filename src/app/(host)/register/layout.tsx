import { ReactNode } from 'react';
import RegisterFooter from '../components/RegisterFooter';
import RegisterHeader from '../components/RegisterHeader';

interface RegisterLayoutProps {
  children: ReactNode;
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <>
      <RegisterHeader />
      <div className="h-screen px-32 pb-24 pt-[78px]">{children}</div>
      <RegisterFooter />
    </>
  );
}
