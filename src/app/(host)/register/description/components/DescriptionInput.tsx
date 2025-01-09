'use client';

import { useState } from 'react';

export default function DescriptionInput() {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <>
      <p className="mb-4 text-3xl font-semibold">숙소 설명 작성하기</p>
      <span className="text-lg text-neutral-07">숙소의 특징과 장점을 알려주세요.</span>
      <input
        className="mt-8 h-48 w-full rounded-xl border-[1.5px] border-neutral-07 p-4 align-text-top text-xl focus:border-black focus:outline-none"
        type="text"
        maxLength={500}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span className="mt-4 font-semibold text-neutral-08">{inputValue.length}/500</span>
    </>
  );
}
