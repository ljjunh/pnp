'use server';

import { signIn } from '@/auth';
import { z } from 'zod';

// 이메일 로그인
type FormState = {
  errors?: {
    email?: string[];
    server?: string[];
  };
  success?: boolean;
  email?: string; // 성공 시 이메일 주소 저장
};

// 소셜 로그인
type Provider = 'google' | 'kakao';

const formSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.').toLowerCase(),
});

export async function handleEmailLogin(prevState: FormState | null, formData: FormData): Promise<FormState> {
  try {
    const data = { email: formData.get('email') as string };
    const result = formSchema.safeParse(data);

    if (!result.success) {
      return {
        errors: {
          email: result.error.issues.map(issue => issue.message),
        }
      };
    }

    await signIn('resend', { 
      email: result.data.email, 
      redirectTo: '/', 
      redirect: false 
    });

    return {
      success: true,
      email: result.data.email // 성공 시 이메일 저장
    };

  } catch (error) {
    return {
      errors: {
        server: ['로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.']
      }
    };
  }
}

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
