'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SocialLogin } from '@/app/login/SocialLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일은 필수입니다' })
    .email({ message: '올바른 이메일 형식이 아닙니다' }),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signIn('email', {
        email: data.email,
        callbackUrl: '/',
        redirect: false,
      });
      alert('이메일이 전송되었습니다');
    } catch (error) {
      console.error('Login error:', error);
      alert('오류가 발생했습니다');
    }
  };

  return (
    <main
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-screen-sm rounded-lg bg-white"
    >
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="이메일"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              disabled={isSubmitting}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
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
