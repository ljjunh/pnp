import { useCallback, useRef, useState } from 'react';
import { Review, ReviewSortType } from '@/types/review';
import { getReviews } from '@/apis/reviews/queries';

interface UseRoomReviewsProps {
  roomId: number;
  initialReviews: Review[];
  initialSort?: ReviewSortType;
}

interface CachedData {
  reviews: Review[];
  currentPage: number;
  hasNextPage: boolean;
}

export function useRoomReviews({
  roomId,
  initialReviews,
  initialSort = 'recent',
}: UseRoomReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [sortType, setSortType] = useState<ReviewSortType>(initialSort);

  // 캐시 저장소
  // SSR로 받아온 initial 데이터는 'recent' 정렬의 첫 페이지로 저장
  const cachesRef = useRef(
    new Map<ReviewSortType, CachedData>([
      [
        'recent',
        {
          reviews: initialReviews,
          currentPage: 1,
          hasNextPage: true,
        },
      ],
    ]),
  );

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || isLoading) return;

    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      const response = await getReviews(roomId, nextPage, 10, sortType);

      // 새로운 데이터를 기존 데이터와 합침
      const newReviews = [...reviews, ...response.data.reviews];
      setReviews(newReviews);
      setCurrentPage(nextPage);
      setHasNextPage(response.page.hasNextPage);

      // 캐시 업데이트
      cachesRef.current.set(sortType, {
        reviews: newReviews,
        currentPage: nextPage,
        hasNextPage: response.page.hasNextPage,
      });
    } catch (error) {
      console.error('리뷰 불려오는 중 에러', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasNextPage, isLoading, reviews, roomId, sortType]);

  const changeSort = useCallback(
    async (newSort: ReviewSortType) => {
      if (sortType === newSort) return;

      const cached = cachesRef.current.get(newSort);
      if (cached) {
        // 캐시된 데이터가 있으면 그대로 사용
        setReviews(cached.reviews);
        setCurrentPage(cached.currentPage);
        setHasNextPage(cached.hasNextPage);
        setSortType(newSort);
        return;
      }

      // 캐시된 데이터가 없으면 새로 패칭
      try {
        setIsLoading(true);

        const response = await getReviews(roomId, 1, 10, newSort);

        setReviews(response.data.reviews);
        setCurrentPage(1);
        setHasNextPage(response.page.hasNextPage);
        setSortType(newSort);

        // 새로운 데이터 캐시에 저장
        cachesRef.current.set(newSort, {
          reviews: response.data.reviews,
          currentPage: 1,
          hasNextPage: response.page.hasNextPage,
        });
      } catch (error) {
        console.error('정렬조건 변경 후 패치 에러', error);
      } finally {
        setIsLoading(false);
      }
    },
    [roomId, sortType],
  );

  return {
    reviews,
    isLoading,
    hasNextPage,
    fetchNextPage,
    sortType,
    changeSort,
  };
}
