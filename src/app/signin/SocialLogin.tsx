import { FormBtn } from './FormBtn';
import { googleLogin, kakaoLogin } from './action';

export async function SocialLogin() {
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
        <span className="relative bg-white px-4 text-sm text-gray-500">또는</span>
      </div>

      {/* 소셜 로그인 버튼들 */}
      <nav className="space-y-3">
        <form action={googleLogin}>
          <FormBtn text="구글로 로그인하기" />
        </form>

        <form action={kakaoLogin}>
          <FormBtn text="카카오로 로그인하기" />
        </form>
      </nav>
    </>
  );
}
