'use client';

import Link from 'next/link';
import { EmailLoginFormBtn } from '@/app/signin/components/EmailLoginFormBtn';
import { useEmailLoginForm } from '@/hooks/useEmailLoginForm';
import { getWebmailUrl } from '@/utils/email';

export const EmailLoginForm = () => {
  const { dispatch, email, success, errors } = useEmailLoginForm();

  return (
    <div className="space-y-4">
      {/* 이메일 전송 완료 후 안내 문구 */}
      {success && email && (
        <div className="rounded-md bg-green-50 px-2 py-4">
          <div className="flex items-end gap-4">
            <p className="text-sm text-green-700">이메일로 전송된 로그인 링크를 확인하세요</p>
            <Link
              href={getWebmailUrl(email)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 underline hover:text-green-800"
            >
              메일로 이동하기
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
          {errors.email.length > 0 && <p className="text-sm text-red-500">{errors.email[0]}</p>}
        </div>

        {/* 서버 관련 에러 문구 */}
        {errors.server.length > 0 && (
          <div className="rounded-md bg-red-50 px-2 py-4">
            <p className="text-sm text-red-500">{errors.server[0]}</p>
          </div>
        )}

        {/* 제출 버튼 */}
        <EmailLoginFormBtn />
      </form>
    </div>
  );
};
