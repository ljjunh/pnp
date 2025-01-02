'use client';

import { useState } from 'react';
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
    </div>
  );
}
