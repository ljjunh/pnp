import Header from '@/components/common/Header/Header';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="px-10 pt-20 xl:px-20">{children}</main>
    </>
  );
}
