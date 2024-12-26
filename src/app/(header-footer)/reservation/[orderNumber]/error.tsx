'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants/routeURL';

export default function ReservationError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8">
      {/* 아이콘 */}
      <div className="rounded-full bg-red-100 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* 메시지 */}
      <p className="text-center text-lg text-gray-600">{error.message}</p>

      {/* 버튼 그룹 */}
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-primary-01 px-6 py-3 text-white transition hover:bg-primary-01/90"
        >
          다시 시도
        </button>
        <Link
          href={ROUTES.HOME}
          className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-50"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
