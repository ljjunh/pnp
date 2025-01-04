'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BiCategory } from 'react-icons/bi';
import Link from 'next/link';

export default function Privacy() {
  const [privacy, setPrivacy] = useState<string | null>(null);

  const selected = 'border-black bg-neutral-02 border-2';

  return (
    <div className="my-40 flex items-center justify-center">
      <div className="w-[600px]">
        <p className="pb-11 text-3xl">게스트가 사용할 숙소 유형</p>
        <div className="flex flex-col gap-4">
          <div
            className={cn(
              'flex cursor-pointer items-center justify-between rounded-xl border border-neutral-03 p-6 hover:border-black hover:bg-neutral-02',
              privacy === 'all' && selected,
            )}
            onClick={() => setPrivacy('all')}
          >
            <div className="flex flex-col">
              <span className="text-lg">공간 전체</span>
              <span className="text-sm">게스트가 숙소 전체를 단독으로 사용합니다</span>
            </div>
            <BiCategory size={24} />
          </div>
          <div
            className={cn(
              'flex cursor-pointer items-center justify-between rounded-xl border border-neutral-03 p-6 hover:border-black hover:bg-neutral-02',
              privacy === 'room' && selected,
            )}
            onClick={() => setPrivacy('room')}
          >
            <div className="flex flex-col">
              <span className="text-lg">방</span>
              <span className="text-sm">
                단독으로 사용하는 개인실이 있고, 공용 공간도 있는 형태입니다.
              </span>
            </div>
            <BiCategory size={24} />
          </div>
          <div
            className={cn(
              'flex cursor-pointer items-center justify-between rounded-xl border border-neutral-03 p-6 hover:border-black hover:bg-neutral-02',
              privacy === 'many' && selected,
            )}
            onClick={() => setPrivacy('many')}
          >
            <div className="flex flex-col">
              <span className="text-lg">호스텔 내 다인실</span>
              <span className="text-sm">
                게스트는 연중무휴 직원이 상주하는 전문 숙박시설인 호스텔 내부 <br />
                다인실에서 머무릅니다
              </span>
            </div>
            <BiCategory size={24} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex h-20 items-center justify-center border-t border-neutral-04 bg-white">
        <div className="flex w-full flex-row items-center justify-between px-20">
          <Link
            href={'..'}
            className="border-b border-black text-base"
          >
            뒤로
          </Link>
          <button className="rounded-xl bg-black px-8 py-3 text-white">다음</button>
        </div>
      </div>
    </div>
  );
}
