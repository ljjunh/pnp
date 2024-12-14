'use client';

import { useFormStatus } from 'react-dom';
import { FaGoogle } from 'react-icons/fa';
import { SiKakao } from 'react-icons/si';

export function SocialLoginFormBtn({ text }: { text: string }) {
  const { pending } = useFormStatus();

  const getIcon = () => {
    switch (text) {
      case '구글로 로그인하기':
        return <FaGoogle className="size-5" />;
      case '카카오로 로그인하기':
        return <SiKakao className="size-6" />;
      default:
        return <div/>;
    }
  };

  return (
    <button
      disabled={pending}
      className="flex w-full items-center justify-between rounded-md border border-gray-500 px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
    >
      {getIcon()}
      <div>{pending ? '로그인 중' : text}</div>
      <div />
    </button>
  );
}