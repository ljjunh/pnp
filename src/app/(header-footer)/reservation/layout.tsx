import Header from '@/components/common/Header/Header';

export default function ReservationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="px-30 pt-20 lg:px-60">{children}</main>
    </>
  );
}
