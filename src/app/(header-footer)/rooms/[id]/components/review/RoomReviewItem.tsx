'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import RoomReviewDeleteButton from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewDeleteButton';
import RoomReviewEditForm from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewEditForm';
import { RatingValues, Review } from '@/types/review';
import { calculateAverageRating } from '@/utils/calculateAverageRating';
import { formatElapsedTime } from '@/utils/formatElapsedTime';
import { formatRelativeDate } from '@/utils/formatRelativeDate';
import { IoIosStar } from 'react-icons/io';

interface RoomReviewItemProps {
  roomId: number;
  reviewId: Review['id'];
  accuracy: Review['accuracy'];
  communication: Review['communication'];
  cleanliness: Review['cleanliness'];
  location: Review['location'];
  checkIn: Review['checkIn'];
  value: Review['value'];
  content: Review['content'];
  createdAt: Review['createdAt'];
  user: Review['user'];
  isInterceptedRoute?: boolean;
}

export default function RoomReviewItem({
  roomId,
  reviewId,
  accuracy,
  communication,
  cleanliness,
  location,
  checkIn,
  value,
  content,
  createdAt,
  user,
  isInterceptedRoute = false,
}: RoomReviewItemProps) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const initialRatings: RatingValues = {
    accuracy,
    cleanliness,
    checkIn,
    communication,
    location,
    value,
  };

  const rating = calculateAverageRating([
    accuracy,
    communication,
    cleanliness,
    location,
    checkIn,
    value,
  ]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {user.image ? (
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={user.image}
                  alt="user-image"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-black"></div>
            )}
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-shade-02">
                에어비앤비 가입 기간 {formatElapsedTime(new Date(user.host.hostStartedAt))}
              </div>
            </div>
          </div>
          {session?.user.id === user.id && isInterceptedRoute && (
            <div className="flex gap-2 text-sm text-neutral-07">
              <button
                onClick={() => setIsEditing(true)}
                className="hover:text-black"
              >
                수정
              </button>
              <RoomReviewDeleteButton
                roomId={roomId}
                reviewId={reviewId}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm">
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
          <span className="text-neutral-07">·</span>
          <div>{formatRelativeDate(new Date(createdAt))}</div>
        </div>
      </div>
      {isEditing ? (
        <RoomReviewEditForm
          roomId={roomId}
          reviewId={reviewId}
          initialContent={content ? content : ''}
          initialRatings={initialRatings}
          onCancel={() => setIsEditing(false)}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <div className="mt-1 text-shade-02">{content}</div>
      )}
    </div>
  );
}
