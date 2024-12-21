import { signIn } from '@/auth';
import { ERROR_MESSAGES, GOOGLE, KAKAO } from '@/constants/login';
import { googleLogin, handleEmailLogin, kakaoLogin } from './action';

// signIn 모킹
jest.mock('@/auth', () => ({
  signIn: jest.fn(),
}));

describe('이메일 로그인 처리 (handleEmailLogin)', () => {
  const prevState = {
    success: false,
    errors: {
      email: [],
      server: [],
    },
    email: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('이메일 유효성 검사', () => {
    it('유효하지 않은 이메일 형식일 경우 에러를 반환해야 함', async () => {
      // given
      const formData = new FormData();
      formData.append('email', 'invalid-email');

      // when
      const result = await handleEmailLogin(prevState, formData);

      // then
      expect(result).toEqual({
        success: false,
        errors: {
          email: [ERROR_MESSAGES.INVALID_EMAIL],
          server: [],
        },
        email: '',
      });
      expect(signIn).not.toHaveBeenCalled();
    });

    it('이메일 길이가 5자 미만일 경우 에러를 반환해야 함', async () => {
      // given
      const formData = new FormData();
      formData.append('email', 'abc');

      // when
      const result = await handleEmailLogin(prevState, formData);

      // then
      expect(result).toEqual({
        success: false,
        errors: {
          email: [ERROR_MESSAGES.MIN_LENGTH_EMAIL, ERROR_MESSAGES.INVALID_EMAIL],
          server: [],
        },
        email: '',
      });
      expect(signIn).not.toHaveBeenCalled();
    });

    it('이메일 길이가 254자를 초과할 경우 에러를 반환해야 함', async () => {
      // given
      const formData = new FormData();
      const longEmail = 'a'.repeat(254) + '@test.com';
      formData.append('email', longEmail);

      // when
      const result = await handleEmailLogin(prevState, formData);

      // then
      expect(result).toEqual({
        success: false,
        errors: {
          email: [ERROR_MESSAGES.MAX_LENGTH_EMAIL],
          server: [],
        },
        email: '',
      });
      expect(signIn).not.toHaveBeenCalled();
    });
  });

  describe('로그인 프로세스', () => {
    it('유효한 이메일로 로그인 시도 시 성공해야 함', async () => {
      // given
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      (signIn as jest.Mock).mockResolvedValueOnce(undefined);

      // when
      const result = await handleEmailLogin(prevState, formData);

      // then
      expect(result).toEqual({
        success: true,
        errors: {
          email: [],
          server: [],
        },
        email: 'test@example.com',
      });
      expect(signIn).toHaveBeenCalledWith('resend', {
        email: 'test@example.com',
        redirectTo: '/',
        redirect: false,
      });
    });

    it('대문자가 포함된 이메일로 로그인 시도 시 성공해야 함', async () => {
      // given
      const formData = new FormData();
      formData.append('email', 'TEST@example.com');
      (signIn as jest.Mock).mockResolvedValueOnce(undefined);

      // when
      const result = await handleEmailLogin(prevState, formData);

      // then
      expect(result).toEqual({
        success: true,
        errors: {
          email: [],
          server: [],
        },
        email: 'test@example.com',
      });
      expect(signIn).toHaveBeenCalledWith('resend', {
        email: 'test@example.com',
        redirectTo: '/',
        redirect: false,
      });
    });

    it('공백이 포함된 이메일로 로그인 시도 시 성공해야 함', async () => {
      // given
      const formData = new FormData();
      formData.append('email', '       test@example.com       ');
      (signIn as jest.Mock).mockResolvedValueOnce(undefined);

      // when
      const result = await handleEmailLogin(prevState, formData);

      // then
      expect(result).toEqual({
        success: true,
        errors: {
          email: [],
          server: [],
        },
        email: 'test@example.com',
      });
      expect(signIn).toHaveBeenCalledWith('resend', {
        email: 'test@example.com',
        redirectTo: '/',
        redirect: false,
      });
    });

    it('서버 에러 발생 시 적절한 에러 메시지를 반환해야 함', async () => {
      // given
      const formData = new FormData();
      formData.append('email', 'test@example.com');
      (signIn as jest.Mock).mockRejectedValueOnce(new Error('Server error'));

      // when
      const result = await handleEmailLogin(prevState, formData);

      // then
      expect(result).toEqual({
        success: false,
        errors: {
          email: [],
          server: [ERROR_MESSAGES.SERVER_ERROR],
        },
        email: '',
      });
    });
  });
});

describe('소셜 로그인 (Social Login)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('구글 로그인', () => {
    it('구글 로그인 호출 시 올바른 파라미터로 signIn이 호출되어야 함', async () => {
      // when
      await googleLogin();

      // then
      expect(signIn).toHaveBeenCalledWith(GOOGLE, { redirectTo: '/' });
    });

    it('구글 로그인 실패 시 적절한 에러 처리가 되어야 함', async () => {
      (signIn as jest.Mock).mockRejectedValueOnce(new Error('Authentication failed'));

      await expect(googleLogin()).rejects.toThrow('Authentication failed');
    });
  });

  describe('카카오 로그인', () => {
    it('카카오 로그인 호출 시 올바른 파라미터로 signIn이 호출되어야 함', async () => {
      // when
      await kakaoLogin();

      // then
      expect(signIn).toHaveBeenCalledWith(KAKAO, { redirectTo: '/' });
    });

    it('카카오 로그인 실패 시 적절한 에러 처리가 되어야 함', async () => {
      (signIn as jest.Mock).mockRejectedValueOnce(new Error('Authentication failed'));

      await expect(kakaoLogin()).rejects.toThrow('Authentication failed');
    });
  });
});
