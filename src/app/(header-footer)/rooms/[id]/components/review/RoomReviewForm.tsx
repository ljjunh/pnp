'use client';

import { useState } from 'react';
import Button from '@/components/common/Button/Button';

export default function RoomReviewForm() {
  const [content, setContent] = useState('');

  return (
    <div className="flex-none pt-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="후기를 남겨주세요"
          className="flex-1 rounded-lg border border-neutral-03 px-6 py-4 text-sm focus:border-2 focus:border-black focus:outline-none"
        />

        <Button
          variant="secondary"
          isDisabled={!content.trim()}
        >
          작성
        </Button>
      </div>
    </div>
  );
}
