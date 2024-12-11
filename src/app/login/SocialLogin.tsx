import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';
import { SiKakao } from 'react-icons/si';

export function SocialLogin() {
  const handleSocialLogin = async (provider: string) => {
    try {
      await signIn(provider, {
        callbackUrl: '/',
      });
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    }
  };

  return (
    <>
      {/* 구분선 */}
      <div role='separator' className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <span className="relative bg-white px-4 text-sm text-gray-500">또는</span>
      </div>

      {/* 구글 로그인 */}
      <nav className="space-y-3">
        <button
          onClick={() => handleSocialLogin('google')}
          className="flex w-full items-center justify-between rounded-md border border-gray-500 px-4 py-2 hover:bg-gray-100"
        >
          <FaGoogle className="size-5" />
          <div>구글로 로그인하기</div>
          <div/>
        </button>

        {/* 카카오 로그인 */}
        <button
          onClick={() => handleSocialLogin('kakao')}
          className="flex w-full items-center justify-between rounded-md border border-gray-500 px-4 py-2 hover:bg-gray-100"
        >
          <SiKakao className="size-6" />
          <div>카카오톡으로 로그인하기</div>
          <div/>
        </button>
      </nav>
    </>
  );
}
