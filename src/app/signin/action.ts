'use server'

import { signIn } from '@/auth';

export async function handleEmailLogin(formData: FormData) {
  'use server';
  const email = formData.get('email');
  await signIn('resend', { email, redirectTo: '/', redirect: false });
}

type Provider = 'google' | 'kakao';

// 각 provider별 서버 액션 함수를 명시적으로 'use server' 지시문과 함께 선언
async function handleSocialLogin(provider: Provider) {
  'use server';
  await signIn(provider, { redirectTo: '/' });
}

export const googleLogin = async () => {
  'use server';
  await handleSocialLogin('google');
};

export const kakaoLogin = async () => {
  'use server';
  await handleSocialLogin('kakao');
};
