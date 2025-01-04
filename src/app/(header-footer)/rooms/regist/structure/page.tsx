'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PROPERTY } from '@/constants/property';
import { BiCategory } from 'react-icons/bi';

export default function Structure() {
  const [property, setProperty] = useState<string | null>(null);

  const selected = 'border-black bg-neutral-02 border-2';

  return (
    <div className="py-11">
      <p className="pb-11 text-3xl">다음 중 숙소를 가장 잘 설명하는 것은 무엇인가요?</p>
      <div className="grid grid-cols-3 gap-4">
        {Object.values(PROPERTY).map((content, index) => (
          <div
            className={cn(
              'flex cursor-pointer flex-col space-y-1.5 rounded-xl border border-neutral-03 p-6 hover:border-black hover:bg-neutral-02',
              content === property ? selected : '',
            )}
            key={`${content}-${index}`}
            onClick={() => setProperty(content)}
          >
            <BiCategory size={24} />
            <span className="whitespace-nowrap text-lg">{content}</span>
          </div>
        ))}
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
