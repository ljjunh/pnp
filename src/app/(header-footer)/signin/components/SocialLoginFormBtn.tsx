'use client';

import { useFormStatus } from 'react-dom';
import { SocialLoginType } from '@/types/login';
import { MESSAGES, SOCIAL_LOGIN_BUTTON } from '@/constants/login';
import { FaGoogle } from 'react-icons/fa';
import { SiKakao } from 'react-icons/si';

export function SocialLoginFormBtn({ text }: { text: SocialLoginType }) {
  const { pending } = useFormStatus();

  const getIcon = () => {
    switch (text) {
      case SOCIAL_LOGIN_BUTTON.GOOGLE:
        return <FaGoogle className="size-5" />;
      case SOCIAL_LOGIN_BUTTON.KAKAO:
        return <SiKakao className="size-6" />;
      default:
        return <div />;
    }
  };

  return (
    <button
      disabled={pending}
      className="mb-1 flex w-full items-center justify-between rounded-md border border-gray-500 px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-100"
    >
      {getIcon()}
      <div>{pending ? MESSAGES.LOGIN_LOADING : text}</div>
      <div />
    </button>
  );
}
