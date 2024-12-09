import Header from '@/components/common/Header/Header';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="px-20 pt-20">{children}</main>
    </>
  );
}
