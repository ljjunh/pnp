import RegisterFooter from '../components/RegisterFooter';
import RegisterHeader from '../components/RegisterHeader';

export default function RegisterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <RegisterHeader />
      <div className="h-screen px-32 pb-24 pt-[78px]">{children}</div>
      <RegisterFooter />
    </>
  );
}
