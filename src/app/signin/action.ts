'use server';

import { signIn } from '@/auth';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
});

export async function handleEmailLogin(formData: FormData) {
  'use server';
  const data = { email: formData.get('email') };
  const result = formSchema.safeParse(data);

  await signIn('resend', { email: result.data?.email, redirectTo: '/', redirect: false });
}

type Provider = 'google' | 'kakao';

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
