'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

export default function RecentlyViewed() {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-screen-2xl px-20 py-6">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/wishlists"
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <IoIosArrowBack className="size-6" />
          </Link>
          <button
            onClick={toggleIsEdit}
            className="cursor-pointer rounded-lg p-2 underline hover:bg-gray-100"
          >
            {isEdit ? '완료' : '수정'}
          </button>
        </div>
        <h1 className="my-6 text-3xl font-medium">최근 조회</h1>
        <div className="">
          <h3 className="font-medium">날짜</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <div className="relative h-[300px] w-[300px]">
                <div className="absolute left-3 top-3 z-10 cursor-pointer rounded-full bg-slate-50 px-2 shadow-lg hover:scale-105 hover:bg-white">
                  <span>&times;</span>
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
