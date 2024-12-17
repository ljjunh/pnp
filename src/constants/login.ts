export const GOOGLE = 'google' as const;

export const KAKAO = 'kakao' as const;

export const MESSAGES = {
  WELCOME: '에어비앤비에 오신 것을 환영합니다.',
  OR: '또는',
  SIGNIN_OR_SIGNUP: '로그인 또는 회원가입',
  LOGIN_LOADING: '로그인 중...',
  SENDING_EMAIL: '이메일 전송 중...',
  CONTINUE: '계속',
  CHECK_EMAIL: '이메일로 전송된 로그인 링크를 확인하세요',
  MOVE_TO_MAIL: '메일로 이동하기'
};

export const ERROR_MESSAGES = {
  REQUIRED_EMAIL: '이메일을 입력해주세요.',
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다.',
  MIN_LENGTH_EMAIL: '이메일은 최소 5자 이상이어야 합니다.',
  MAX_LENGTH_EMAIL: '이메일은 최대 254자까지 가능합니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
};

export const SOCIAL_LOGIN_BUTTON = {
  GOOGLE: '구글로 로그인하기',
  KAKAO: '카카오로 로그인하기',
} as const;
