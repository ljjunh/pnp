'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BiCategory } from 'react-icons/bi';

export default function Privacy() {
  const [privacy, setPrivacy] = useState<string | null>(null);

  const selected = 'border-black bg-neutral-02 border-2';

  return (
    <div className="flex h-full items-center justify-center">
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
    </div>
  );
}
