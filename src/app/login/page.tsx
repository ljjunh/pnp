'use client';

import { useRouter } from 'next/navigation';
import { SocialLogin } from '@/app/login/SocialLogin';
import { authenticate } from './action';

export default function LoginPage() {
  const router = useRouter();

  return (
    <main
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-screen-sm rounded-lg bg-white"
    >
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b p-4">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-700"
        >
          <span className="text-2xl">×</span>
        </button>
        <h1 className="text-lg font-bold">로그인 또는 회원가입</h1>
        <div></div>
      </header>

      <section
        className="p-6"
        role="main"
      >
        <p className="mb-4 font-semibold text-gray-700">에어비앤비에 오신 것을 환영합니다.</p>

        {/* 이메일 로그인 */}
        <form action={authenticate} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="이메일"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button className="w-full rounded-md bg-button-01 py-3 text-white hover:bg-button-02">
            계속
          </button>
        </form>

        {/* 소셜 로그인 */}
        <SocialLogin />
      </section>
    </main>
  );
}
