import Image from 'next/image';
import Link from 'next/link';

export default function Trips() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-screen-2xl px-20 py-12">
        <h1 className="text-3xl font-semibold">여행</h1>

        <div className="my-12 flex h-72 w-full gap-4 rounded-lg border border-gray-300">
          <div className="flex w-[30%] flex-col justify-end gap-6 p-8">
            <div>
              <h3 className="font-medium">아직 예약된 여행이 없습니다!</h3>
              <p className="text-sm text-gray-400">
                여행 가방에 쌓인 먼저를 털어내고 다음 여행 계획을 세워보세요.
              </p>
            </div>
            <Link
              href="/"
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

        <h2 className="my-6 text-xl">이전 여행지</h2>

        <ul className="grid grid-cols-3 gap-5">
          <li className="flex cursor-pointer gap-3">
            <div className="relative w-20">
              <Image
                src="/images/05.avif"
                alt="숙소 이미지"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 text-neutral-400">
              <p className="font-medium text-black">Hwaseong-si</p>
              <p>호스트:Urbanstay님</p>
              <p>2024년 01월 01일 ~ 2024년 01월 03일</p>
            </div>
          </li>
        </ul>

        <hr className="mb-5 mt-12" />

        <div className="flex gap-1 text-sm">
          <p>에약 내역을 찾으실 수 없나요?</p>
          <p className="cursor-pointer underline">도움말 센터 방문하기</p>
        </div>
      </div>
    </div>
  );
}
