'use server';

import { cookies } from 'next/headers';
import { signIn } from '@/auth';
import { z } from 'zod';
import { FormState, Provider } from '@/types/login';
import { ERROR_MESSAGES, GOOGLE, KAKAO } from '@/constants/login';

// 쿠키에 저장된 redirectURL
function getRedirectUrl(): string {
  const cookieStore = cookies();

  return cookieStore.get('prevPath')?.value || '/';
}

// zod 유효성 검사
const formSchema = z.object({
  email: z
    .string({
      required_error: ERROR_MESSAGES.REQUIRED_EMAIL,
      invalid_type_error: ERROR_MESSAGES.INVALID_EMAIL,
    })
    .trim()
    .min(5, ERROR_MESSAGES.MIN_LENGTH_EMAIL)
    .max(254, ERROR_MESSAGES.MAX_LENGTH_EMAIL) // RFC 5321
    .email(ERROR_MESSAGES.INVALID_EMAIL)
    .toLowerCase(),
});

// 이메일 로그인 서버액션
export async function handleEmailLogin(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const data = { email: formData.get('email') as string };
    const result = formSchema.safeParse(data);

    // 이메일 포맷 에러
    if (!result.success) {
      return {
        success: false,
        errors: {
          email: result.error.issues.map((issue) => issue.message),
          server: [],
        },
        email: '',
      };
    }

    const redirectUrl = getRedirectUrl();

    await signIn('resend', {
      email: result.data.email,
      redirectTo: redirectUrl,
      redirect: false,
    });

    return {
      success: true,
      errors: {
        email: [],
        server: [],
      },
      email: result.data.email, // 성공 시 이메일 저장
    };

    // 서버 에러
  } catch (error) {
    return {
      success: false,
      errors: {
        email: [],
        server: [ERROR_MESSAGES.SERVER_ERROR],
      },
      email: '',
    };
  }
}

// 소셜 로그인 서버액션
async function handleSocialLogin(provider: Provider) {
  'use server';
  const redirectUrl = getRedirectUrl();
  await signIn(provider, { redirectTo: redirectUrl });
}

export const googleLogin = async () => {
  'use server';
  await handleSocialLogin(GOOGLE);
};

export const kakaoLogin = async () => {
  'use server';
  await handleSocialLogin(KAKAO);
};
