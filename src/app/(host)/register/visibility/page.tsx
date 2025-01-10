'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Visibility() {
  const [select, setSelect] = useState<'all' | 'experience' | null>(null);

  const selected = 'border-black bg-neutral-02 border-2';

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[700px]">
        <p className="text-3xl">첫 예약의 게스트 조건을 선⁠택⁠해⁠주⁠세⁠요</p>
        <p className="pb-11 text-lg text-neutral-07">
          첫 번째 게스트의 예약을 받은 후에는 누구나 숙소를 예약할 수 있습니다.&nbsp;
          <span className="border-b border-neutral-07">자세히 알아보기</span>
        </p>
        <div className="flex flex-col gap-4">
          <div
            className={cn(
              'flex cursor-pointer items-center space-x-4 rounded-xl border border-neutral-03 p-6 hover:border-black hover:bg-neutral-02',
              select === 'all' && selected,
            )}
            onClick={() => setSelect('all')}
          >
            <input
              type="radio"
              id="all"
              name="visibility"
              checked={select === 'all'}
              onChange={() => setSelect('all')}
              className="h-5 w-5 appearance-none rounded-full border-2 border-neutral-300 transition-all checked:border-[6px] checked:border-black"
            />
            <label
              className="flex cursor-pointer flex-col"
              htmlFor="all"
            >
              <span className="text-lg">모든 에어비앤비 게스트</span>
              <span className="text-sm text-neutral-07">
                모든 에어비앤비 게스트를 맞이하겠다고 설정하면 예약을 더 빨리 받으실 수 있습니다.
              </span>
            </label>
          </div>
          <div
            className={cn(
              'flex cursor-pointer items-center space-x-4 rounded-xl border border-neutral-03 p-6 hover:border-black hover:bg-neutral-02',
              select === 'experience' && selected,
            )}
            onClick={() => setSelect('experience')}
          >
            <input
              type="radio"
              id="experience"
              name="visibility"
              checked={select === 'experience'}
              onChange={() => setSelect('experience')}
              className="h-5 w-5 appearance-none rounded-full border-2 border-neutral-300 transition-all checked:border-[6px] checked:border-black"
            />
            <label
              className="flex cursor-pointer flex-col"
              htmlFor="experience"
            >
              <span className="text-lg">경험이 풍부한 게스트</span>
              <span className="text-sm text-neutral-07">
                에어비앤비 이용 실적이 우수하며, 유용한 호스팅 팁도 제공할 수 있는 사람을 첫 번째
                게스트로 수락하세요.
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
