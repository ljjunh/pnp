'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { LoginHeader } from '@/app/login/LoginHeader';
import { SocialLogin } from '@/app/login/SocialLogin';
import * as z from 'zod';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일은 필수입니다' })
    .email({ message: '올바른 이메일 형식이 아닙니다' }),
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // zod로 이메일 유효성 검증
      schema.parse({ email });

      setIsSubmitting(true);
      await signIn('email', {
        email,
        callbackUrl: '/',
        redirect: false,
      });
      setSuccessMessage('이메일이 전송되었습니다');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // zod 검증 에러 처리
        setError(error.errors[0].message);
      } else {
        console.error('Login error:', error);
        setError('오류가 발생했습니다');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="이메일"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              disabled={isSubmitting}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            {successMessage && <p className="mt-1 text-sm text-green-600">{successMessage}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-button-01 py-3 text-white hover:bg-button-02 disabled:opacity-50"
          >
            {isSubmitting ? '처리중...' : '계속'}
          </button>
        </form>

        <SocialLogin />
      </section>
    </main>
  );
}
