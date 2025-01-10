import Image from 'next/image';
import Link from 'next/link';
import { HandSvg } from '@/app/(user)/trips/components/HandSvg';
import { ROUTES } from '@/constants/routeURL';

export function NoReservation() {
  return (
    <div className="my-12 flex h-72 w-full gap-4 rounded-lg border border-gray-300">
      <div className="flex w-[30%] flex-col justify-end gap-6 p-8">
        <HandSvg />
        <div>
          <h3 className="font-medium">아직 예약된 여행이 없습니다!</h3>
          <p className="text-sm text-gray-400">
            여행 가방에 쌓인 먼저를 털어내고 다음 여행 계획을 세워보세요.
          </p>
        </div>
        <Link
          href={ROUTES.HOME}
          className="w-32 rounded-md bg-button-01 px-3 py-3 text-center text-base text-white"
        >
          숙소 검색하기
        </Link>
      </div>
      <div className="relative w-[70%]">
        <Image
          src="/images/tripImage.avif"
          alt="여행 배너 이미지"
          fill
          className="rounded-e-lg object-cover"
        />
      </div>
    </div>
  );
}
