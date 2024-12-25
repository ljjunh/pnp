import Image from 'next/image';
import Link from 'next/link';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';

export default function WishlistsDetail() {
  return (
    <div className="flex w-full">
      <div className="w-[65%] px-5 pt-5">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/wishlists"
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <IoIosArrowBack className="size-6" />
          </Link>
          <button className="cursor-pointer rounded-lg p-2 underline hover:bg-gray-100">
            <BsThreeDots />
          </button>
        </div>
        <h1 className="my-5 text-2xl font-medium">위시리스트 폴더 명</h1>
        <div className="flex gap-2">
          <button className="rounded-3xl border px-4 py-2 text-sm">날짜 입력하기</button>
          <button className="rounded-3xl border px-4 py-2 text-sm">게스트 1명</button>
          <button className="rounded-3xl border px-4 py-2 text-sm">공유하기</button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="relative aspect-square">
              <Image
                src="/images/05.avif"
                alt="숙소 사진"
                fill
                className="rounded-2xl object-cover"
              />
            </div>
            <div className="mt-2">
              <h3 className="text-base">호스트 이름의 집</h3>
              <p className="text-sm text-neutral-500">침대 1개 ㆍ 침실 1개</p>
            </div>
            <div className="mt-2 w-full rounded-xl bg-gray-100 p-3">
              <p className="cursor-pointer text-sm underline">메모 추가</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-[35%] bg-black text-white">지도</div>
    </div>
  );
}
