import UserHeader from '@/components/common/Header/UserHeader';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <UserHeader />
      <main className="pt-20">{children}</main>
    </>
  );
}
