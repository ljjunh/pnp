'use client';

import { useRouter } from 'next/navigation';
import { SocialLogin } from '@/app/@modal/login/SocialLogin';

export default function LoginModal() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <dialog
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-screen-sm rounded-lg bg-white"
        aria-modal="true"
        open
      >
        {/* 모달 헤더 */}
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

        <main
          className="p-6"
          role="main"
        >
          <p className="mb-4 font-semibold text-gray-700">에어비앤비에 오신 것을 환영합니다.</p>

          {/* 이메일 로그인 */}
          <form>
            <input
              type="email"
              placeholder="이메일"
              className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2"
            />

            <button className="mb-4 w-full rounded-md bg-button-01 py-3 text-white hover:bg-button-02">
              계속
            </button>
          </form>

          {/* 소셜 로그인 */}
          <SocialLogin />
        </main>
      </dialog>
    </div>
  );
}
