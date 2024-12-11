'use client';

import { EmailLoginForm } from '@/app/login/EmailLoginForm';
import { LoginHeader } from '@/app/login/LoginHeader';
import { SocialLogin } from '@/app/login/SocialLogin';

export default function LoginPage() {
  return (
    <main
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-screen-sm rounded-lg bg-white"
    >
      <LoginHeader />

      <section
        className="p-6"
        role="main"
      >
        <p className="mb-4 font-semibold text-gray-700">에어비앤비에 오신 것을 환영합니다.</p>
        <EmailLoginForm />
        <SocialLogin />
      </section>
    </main>
  );
}
