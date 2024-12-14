'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { getWebmailUrl } from '@/utils/email';
import { EmailFormBtn } from './EmailFormBtn';
import { handleEmailLogin } from './action';

export const EmailLoginForm = () => {
  const [state, dispatch] = useFormState(handleEmailLogin, null);

  return (
    <div className="space-y-4">
      {state?.success && state.email && (
        <div className="rounded-md bg-green-50 px-2 py-4">
          <div className="flex items-end gap-4">
            <p className="text-sm text-green-700">이메일로 전송된 로그인 링크를 확인하세요</p>
            <Link
              href={getWebmailUrl(state.email)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 underline hover:text-green-800"
            >
              메일로 이동하기
            </Link>
          </div>
        </div>
      )}
      <form
        action={dispatch}
        className="flex flex-col gap-4"
      >
        <div className="space-y-2">
          <input
            name="email"
            type="email"
            placeholder="이메일"
            className="w-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          {state?.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
        </div>

        {state?.errors?.server && (
          <div className="rounded-md bg-red-50 px-2 py-4">
            <p className="text-sm text-red-500">{state.errors.server[0]}</p>
          </div>
        )}

        <EmailFormBtn />
      </form>
    </div>
  );
};
