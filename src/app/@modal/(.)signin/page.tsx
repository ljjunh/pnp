'use client';

import { useRouter } from 'next/navigation';
import { EmailLoginForm } from '@/app/signin/components/EmailLoginForm';
import { LoginHeader } from '@/app/signin/components/LoginHeader';
import { SocialLogin } from '@/app/signin/components/SocialLogin';
import { MESSAGES } from '@/constants/login';

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
      role="presentation"
      aria-hidden="true"
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
          <p className="mb-4 font-semibold text-gray-700">{MESSAGES.WELCOME}</p>
          <EmailLoginForm />
          <SocialLogin />
        </section>
      </dialog>
    </div>
  );
}
