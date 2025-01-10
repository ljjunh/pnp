import Header from '@/components/common/Header/Header';
import { Toaster } from '@/components/ui/toaster';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="px-30 isolate pt-20 lg:px-60">{children}</main>
      <Toaster />
    </>
  );
}
