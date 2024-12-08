'use client'

import { useRouter } from 'next/navigation';

export default function LoginModal() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
        <h1>Login</h1>
      </div>
    </div>
  );
}
