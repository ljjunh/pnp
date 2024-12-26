import Link from 'next/link';
import MainLogo from '@/components/common/Header/MainLogo';
import { ROUTES } from '@/constants/routeURL';

export default function NotFound() {
  return (
    <>
      <div className="fixed left-8 top-8">
        <MainLogo />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 lg:flex-row">
        <div className="flex max-w-md flex-col text-center lg:text-left">
          <h1 className="text-[120px] font-bold leading-none text-gray-700">Oops!</h1>

          <h2 className="mb-8 mt-8 text-3xl font-medium text-gray-700">
            찾으시는 페이지를 발견하지 못했어요.
          </h2>

          <div className="flex flex-col gap-3 text-lg">
            <p className="mb-4 text-gray-600">도움이 될 만한 링크들을 모아봤어요:</p>
            <Link
              href={ROUTES.HOME}
              className="text-teal-600 hover:underline"
            >
              홈으로 가기
            </Link>
          </div>
        </div>

        <div className="relative h-96 w-96">
          <svg
            className="h-full w-full"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="200"
              cy="120"
              r="40"
              fill="#2A9D8F"
            />
            <rect
              x="160"
              y="160"
              width="80"
              height="120"
              fill="#2A9D8F"
            />
            <rect
              x="160"
              y="280"
              width="20"
              height="60"
              fill="#264653"
            />
            <rect
              x="220"
              y="280"
              width="20"
              height="60"
              fill="#264653"
            />
            <circle
              cx="185"
              cy="110"
              r="5"
              fill="white"
            />
            <circle
              cx="215"
              cy="110"
              r="5"
              fill="white"
            />
            <path
              d="M185 130 Q200 140 215 130"
              stroke="white"
              strokeWidth="3"
              fill="none"
            />
            <rect
              x="250"
              y="200"
              width="40"
              height="50"
              fill="#E9C46A"
              transform="rotate(15)"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
