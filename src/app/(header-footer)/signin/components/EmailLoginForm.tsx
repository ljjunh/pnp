'use client';

import Link from 'next/link';
import { EmailLoginFormBtn } from '@/app/(header-footer)/signin/components/EmailLoginFormBtn';
import { useEmailLoginForm } from '@/hooks/useEmailLoginForm';
import { getWebmailUrl } from '@/utils/email';
import { MESSAGES } from '@/constants/login';

export const EmailLoginForm = () => {
  const { dispatch, email, success, errors } = useEmailLoginForm();

  return (
    <div className="space-y-4">
      {/* 이메일 전송 완료 후 안내 문구 */}
      {success && email && (
        <div className="rounded-md bg-green-50 px-2 py-4">
          <div className="flex items-end gap-4">
            <p className="text-sm text-green-700">{MESSAGES.CHECK_EMAIL}</p>
            <Link
              href={getWebmailUrl(email)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 underline hover:text-green-800"
            >
              {MESSAGES.MOVE_TO_MAIL}
            </Link>
          </div>
        </div>
      )}

      {/* 이메일 입력 폼 */}
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

          {/* 이메일 포맷 관련 에러 문구 */}
          {errors.email.length > 0 && (
            <div
              className="flex flex-col gap-1"
              role="alert"
              aria-live="polite"
            >
              {errors.email.map((error, index) => (
                <p
                  key={index}
                  className="text-sm text-red-500"
                >
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* 서버 관련 에러 문구 */}
        {errors.server.length > 0 && (
          <div
            className="rounded-md bg-red-50 px-2 py-4"
            role="alert"
            aria-live="polite"
          >
            <p className="text-sm text-red-500">{errors.server[0]}</p>
          </div>
        )}

        {/* 제출 버튼 */}
        <EmailLoginFormBtn />
      </form>
    </div>
  );
};
