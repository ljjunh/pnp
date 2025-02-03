'use client';

import { useEffect } from 'react';
import { useRoomStore } from '@/store/useRoomStore';

export default function Description() {
  const { room } = useRoomStore();

  // 하이드레이션 완료
  useEffect(() => {
    useRoomStore.persist.hasHydrated();
  }, [useRoomStore.persist.hasHydrated()]);

  return (
    <div className="flex h-full w-full flex-col items-start justify-center px-80">
      <p className="mb-4 text-3xl font-semibold">숙소 설명 작성하기</p>
      <span className="text-lg text-neutral-07">
        숙소의 특징과 장점을 알려주세요. 최대 500자까지 작성할 수 있습니다.
      </span>
      <textarea
        className="mt-8 h-48 w-full resize-none rounded-xl border-[1.5px] border-neutral-07 p-4 align-text-top text-lg focus:border-black focus:outline-none"
        name="description"
        aria-label="숙소 설명"
        required
        minLength={10}
        maxLength={500}
        defaultValue={room?.description}
      />
      <input
        type="hidden"
        name="step"
        value="description"
      />
    </div>
  );
}
