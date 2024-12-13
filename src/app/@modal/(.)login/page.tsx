'use client';

import { useRouter } from 'next/navigation';
import { EmailLoginForm } from '@/app/login/EmailLoginForm';
import { LoginHeader } from '@/app/login/LoginHeader';
import { SocialLogin } from '@/app/login/SocialLogin';

export default function LoginModal() {
  const router = useRouter();

  // 뒤로 가기
  const handleBack = () => {
    router.back();
  };

  return (
    <div
      onClick={handleBack}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role='presentation'
      aria-hidden='true'
    >
      <dialog
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-screen-sm rounded-lg bg-white"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            handleBack();
          }
        }}
      >
        <LoginHeader onBack={handleBack} />

        <section
          className="p-6"
          role="main"
        >
          <p className="mb-4 font-semibold text-gray-700">에어비앤비에 오신 것을 환영합니다.</p>
          <EmailLoginForm />
          <SocialLogin />
        </section>
      </dialog>
    </div>
  );
}
