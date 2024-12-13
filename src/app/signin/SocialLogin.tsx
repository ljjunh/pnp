import { googleLogin, kakaoLogin } from "./action";

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
          <button
            type="submit"
            className="flex w-full items-center justify-between rounded-md border border-gray-500 px-4 py-2 hover:bg-gray-100"
          >
            <div />
            <div>구글로 로그인하기</div>
            <div />
          </button>
        </form>

        <form action={kakaoLogin}>
          <button
            type="submit"
            className="flex w-full items-center justify-between rounded-md border border-gray-500 px-4 py-2 hover:bg-gray-100"
          >
            <div />
            <div>카카오톡으로 로그인하기</div>
            <div />
          </button>
        </form>
      </nav>
    </>
  );
}
