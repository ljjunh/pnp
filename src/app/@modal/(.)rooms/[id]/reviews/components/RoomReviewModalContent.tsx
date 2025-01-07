'use client';

import { useRef } from 'react';
import RoomReviewCreateForm from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewCreateForm';
import RoomReviewItem from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewItem';
import { Loader2 } from 'lucide-react';
import { ReviewSortType } from '@/types/review';
import { GetReviewsResponse } from '@/apis/reviews/queries';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRoomReviews } from '@/hooks/useRoomReviews';
import { IoSearch } from 'react-icons/io5';

interface RoomReviewModalContentProps {
  roomId: number;
  review: GetReviewsResponse;
  isAvailable: string[];
}

const sortOptions = [
  { value: 'recent', label: '최신순' },
  { value: 'high', label: '평점 높은순' },
  { value: 'low', label: '평점 낮은순' },
] as const;

export default function RoomReviewModalContent({
  review,
  roomId,
  isAvailable,
}: RoomReviewModalContentProps) {
  const { reviews, isLoading, hasNextPage, fetchNextPage, sortType, changeSort } = useRoomReviews({
    roomId,
    initialReviews: review.data.reviews,
  });

  const observerRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    disabled: isLoading && !hasNextPage,
  });

  const listRef = useRef<HTMLDivElement>(null);

  const handleSortChange = (newSort: ReviewSortType) => {
    listRef.current?.scrollTo(0, 0);
    changeSort(newSort);
  };

  return (
    <div className="flex w-[550px] flex-col pl-16">
      {/* 상단 영역 - 고정 */}
      <div className="flex-none">
        <div className="flex items-center justify-between">
          <span className="text-2xl">
            <span>후기</span>
            <span className="font-semibold"> {review.data.count}</span>
            <span>개</span>
          </span>
          <div className="relative flex gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs ${
                  sortType === option.value
                    ? 'border-black bg-black text-white'
                    : 'border-neutral-03'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative my-8">
          <input
            type="text"
            placeholder="후기 검색"
            className="w-full rounded-full border border-neutral-07 px-4 py-2 pl-10 focus:border-2 focus:border-black focus:outline-none"
          />
          <IoSearch
            className="absolute left-4 top-1/2 -translate-y-1/2"
            size={20}
          />
        </div>
      </div>

      {/* 리뷰 리스트 - 스크롤 */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto pr-4"
      >
        <div className="space-y-8">
          {reviews.length > 0 ? (
            <>
              {reviews.map((review) => (
                <RoomReviewItem
                  key={review.id}
                  roomId={roomId}
                  reviewId={review.id}
                  accuracy={review.accuracy}
                  communication={review.communication}
                  cleanliness={review.cleanliness}
                  location={review.location}
                  checkIn={review.checkIn}
                  value={review.value}
                  content={review.content}
                  createdAt={review.createdAt}
                  user={review.user}
                  isInterceptedRoute
                />
              ))}
              {isLoading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-neutral-07" />
                </div>
              )}
              <div
                ref={observerRef}
                className="h-4"
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-neutral-07">
              <svg
                className="mb-4 h-16 w-16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
              </svg>
              <p className="text-lg font-medium">아직 작성된 리뷰가 없어요</p>
              <p className="mt-1 text-sm">이 숙소의 첫 번째 리뷰를 남겨보세요!</p>
            </div>
          )}
        </div>
      </div>
      {isAvailable.length > 0 && (
        <RoomReviewCreateForm
          roomId={roomId}
          isAvailable={isAvailable}
        />
      )}
    </div>
  );
}
