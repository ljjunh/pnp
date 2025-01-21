'use client';

import { useState } from 'react';
import Image from 'next/image';
import RoomReviewDeleteButton from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewDeleteButton';
import RoomReviewEditForm from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewEditForm';
import { RatingValues, Review } from '@/types/review';
import { useSession } from '@/hooks/useSession';
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
  // !FIXME: session 수정
  const { user: session } = useSession();
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

  // TODO: api에서 user 안에 host 정보가 안넘어옴

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
                {/* TODO: 나중에 살리기 */}
                {/* 에어비앤비 가입 기간 {formatElapsedTime(new Date(user.host.hostStartedAt))} */}
                에어비앤비 가입 기간 {formatElapsedTime(new Date())}
              </div>
            </div>
          </div>
          {session?.id === user.id && isInterceptedRoute && (
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
          {/* TODO 날짜 형태 수정 필요. */}
          {/* <div>{formatRelativeDate(new Date(createdAt))}</div> */}
          <div>{formatRelativeDate(new Date())}</div>
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
