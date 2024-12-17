import React from 'react';
import { Review } from '@/types/review';
import { formatElapsedTime } from '@/utils/formatElapsedTime';
import { formatRelativeDate } from '@/utils/formatRelativeDate';
import { IoIosStar } from 'react-icons/io';

interface RoomReviewItemProps {
  accuracy: Review['accuracy'];
  communication: Review['communication'];
  cleanliness: Review['cleanliness'];
  location: Review['location'];
  checkIn: Review['checkIn'];
  value: Review['value'];
  content: Review['content'];
  createdAt: Review['createdAt'];
  user: Review['user'];
}

export default function RoomReviewItem({
  accuracy,
  communication,
  cleanliness,
  location,
  checkIn,
  value,
  content,
  createdAt,
  user,
}: RoomReviewItemProps) {
  const rating =
    [accuracy, communication, cleanliness, location, checkIn, value].reduce(
      (sum, score) => sum + score,
      0,
    ) / 6;

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="text-xs"
          >
            <IoIosStar className={rating >= star ? 'text-black' : 'text-gray-200'} />
          </span>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-black"></div>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-shade-02">
              에어비앤비 가입 기간 {formatElapsedTime(new Date(user.host.hostStartedAt))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <StarRating rating={rating} />
          <span className="text-neutral-07">·</span>
          <div>{formatRelativeDate(new Date(createdAt))}</div>
        </div>
      </div>
      <div className="mt-1 text-shade-02">{content}</div>
    </div>
  );
}
