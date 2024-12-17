export const GOOGLE = 'google' as const;

export const KAKAO = 'kakao' as const;

export const MESSAGES = {
  WELCOME: '에어비앤비에 오신 것을 환영합니다.',
  OR: '또는',
  SIGNIN_OR_SIGNUP: '로그인 또는 회원가입',
};

export const ERROR_MESSAGES = {
  INVALID_EMAIL: '유효한 이메일 주소를 입력해주세요.',
  SERVER_ERROR: '로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

export const SOCIAL_LOGIN_BUTTON = {
  GOOGLE: '구글로 로그인하기',
  KAKAO: '카카오로 로그인하기',
} as const;
