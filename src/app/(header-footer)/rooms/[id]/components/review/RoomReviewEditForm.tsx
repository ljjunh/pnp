'use client';

import { useState } from 'react';
import { RatingValues, Review } from '@/types/review';
import { RATING_ITEMS } from '@/constants/review';
import RoomReviewEditButton from './RoomReviewEditButton';
import RoomReviewRating from './RoomReviewRating';

interface RoomReviewEditFormProps {
  roomId: number;
  reviewId: Review['id'];
  initialContent: string;
  initialRatings: RatingValues;
  onCancel: () => void;
  onClose: () => void;
}

export default function RoomReviewEditForm({
  roomId,
  reviewId,
  initialContent,
  initialRatings,
  onCancel,
  onClose,
}: RoomReviewEditFormProps) {
  const [content, setContent] = useState(initialContent);
  const [ratings, setRatings] = useState<RatingValues>(initialRatings);

  const handleRatingChange = (key: keyof RatingValues) => (value: number) => {
    setRatings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="mt-2">
      <div className="grid grid-cols-2 gap-x-8 pb-4">
        {RATING_ITEMS.map(({ key, label }) => (
          <RoomReviewRating
            key={key}
            label={label}
            value={ratings[key]}
            onChange={handleRatingChange(key)}
          />
        ))}
      </div>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded-lg border p-2 text-shade-02"
        rows={3}
        value={content}
      />
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-lg px-3 py-1 hover:bg-neutral-02"
        >
          취소
        </button>
        <RoomReviewEditButton
          roomId={roomId}
          reviewId={reviewId}
          editingContent={content}
          onClose={onClose}
          editRatings={ratings}
        />
      </div>
    </div>
  );
}
