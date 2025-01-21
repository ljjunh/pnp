import Link from 'next/link';
import { SocialLoginFormBtn } from '@/app/(header-footer)/signin/components/SocialLoginFormBtn';
import { MESSAGES, SOCIAL_LOGIN_BUTTON } from '@/constants/login';

// TODO: 로그인 redirect uri 이전 페이지로 수정

const GOOGLE_LOGIN_URL =
  'http://localhost:8080/auth/authorization/google?oauth_redirect_uri=http://localhost:3000';
const KAKAO_LOGIN_URL =
  'http://localhost:8080/auth/authorization/kakao?oauth_redirect_uri=http://localhost:3000';

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
        <Link href={GOOGLE_LOGIN_URL}>
          <SocialLoginFormBtn text={SOCIAL_LOGIN_BUTTON.GOOGLE} />
        </Link>

        <Link href={KAKAO_LOGIN_URL}>
          <SocialLoginFormBtn text={SOCIAL_LOGIN_BUTTON.KAKAO} />
        </Link>
      </nav>
    </>
  );
}
