import { GOOGLE, KAKAO, SOCIAL_LOGIN_BUTTON } from '@/constants/login';

// 이메일 로그인 관련 타입
export type FormState = {
  success: boolean;
  errors: {
    email: string[];
    server: string[];
  };
  email: string;
};

// 소셜 로그인 관련 타입
export type Provider = typeof GOOGLE | typeof KAKAO;

// 소셜 로그인 버튼 타입
export type SocialLoginType = (typeof SOCIAL_LOGIN_BUTTON)[keyof typeof SOCIAL_LOGIN_BUTTON];
