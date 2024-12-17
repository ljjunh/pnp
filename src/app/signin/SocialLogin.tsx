import { SocialLoginFormBtn } from '@/app/signin/SocialLoginFormBtn';
import { googleLogin, kakaoLogin } from '@/app/signin/action';
import { MESSAGES, SOCIAL_LOGIN_BUTTON } from '@/constants/login';

export function SocialLogin() {
  return (
    <>
      {/* 구분선 */}
      <div
        role="separator"
        className="relative my-6 text-center"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <span className="relative bg-white px-4 text-sm text-gray-500">{MESSAGES.OR}</span>
      </div>

      {/* 소셜 로그인 버튼들 */}
      <nav className="space-y-3">
        <form action={googleLogin}>
          <SocialLoginFormBtn text={SOCIAL_LOGIN_BUTTON.GOOGLE} />
        </form>

        <form action={kakaoLogin}>
          <SocialLoginFormBtn text={SOCIAL_LOGIN_BUTTON.KAKAO} />
        </form>
      </nav>
    </>
  );
}
