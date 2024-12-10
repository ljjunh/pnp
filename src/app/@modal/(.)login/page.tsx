'use client';

import { useRouter } from 'next/navigation';
import LoginPage from '@/app/login/page';

export default function LoginModal() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <LoginPage />
    </div>
  );
}
