'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import RoomReviewDeleteButton from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewDeleteButton';
import RoomReviewEditButton from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewEditButton';
import RoomReviewRating from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewRating';
import { RatingValues, Review } from '@/types/review';
import { calculateAverageRating } from '@/utils/calculateAverageRating';
import { formatElapsedTime } from '@/utils/formatElapsedTime';
import { formatRelativeDate } from '@/utils/formatRelativeDate';
import { RATING_ITEMS } from '@/constants/review';
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

  const [edit, setEdit] = useState({
    isEditing: false,
    content: content,
  });

  const [editRatings, setEditRatings] = useState<RatingValues>({
    accuracy,
    cleanliness,
    checkIn,
    communication,
    location,
    value,
  });

  const rating = calculateAverageRating([
    accuracy,
    communication,
    cleanliness,
    location,
    checkIn,
    value,
  ]);

  const handleRatingChange = (key: keyof RatingValues) => (value: number) => {
    setEditRatings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {user.image ? (
              <div className="relative h-12 w-12">
                <Image
                  src={user.image}
                  alt="user-image"
                  fill
                  className="rounded-full object-cover"
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
                onClick={() => setEdit({ ...edit, isEditing: true })}
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
      {edit.isEditing ? (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-x-8 pb-4">
            {RATING_ITEMS.map(({ key, label }) => (
              <RoomReviewRating
                key={key}
                label={label}
                value={editRatings[key]}
                onChange={handleRatingChange(key)}
              />
            ))}
          </div>
          <textarea
            onChange={(e) => setEdit({ ...edit, content: e.target.value })}
            className="w-full rounded-lg border p-2 text-shade-02"
            rows={3}
            value={edit.content ? edit.content : ''}
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => {
                setEdit({ isEditing: false, content: content });
                setEditRatings({ accuracy, communication, cleanliness, location, checkIn, value });
              }}
              className="rounded-lg px-3 py-1 hover:bg-neutral-02"
            >
              취소
            </button>

            <RoomReviewEditButton
              roomId={roomId}
              reviewId={reviewId}
              editingContent={edit.content ? edit.content : ''}
              onClose={() => setEdit({ isEditing: false, content })}
              editRatings={editRatings}
            />
          </div>
        </div>
      ) : (
        <div className="mt-1 text-shade-02">{content}</div>
      )}
    </div>
  );
}
