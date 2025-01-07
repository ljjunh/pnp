import { useCallback, useState } from 'react';
import { Review } from '@/types/review';
import { getReviews } from '@/apis/reviews/queries';

interface UseRoomReviewsProps {
  roomId: number;
  initialReviews: Review[];
}

export function useRoomReviews({ roomId, initialReviews }: UseRoomReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || isLoading) return;

    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      const response = await getReviews(roomId, nextPage, 10);

      setReviews((prev) => [...prev, ...response.data.reviews]);
      setCurrentPage(nextPage);
      setHasNextPage(response.page.hasNextPage);
    } catch (error) {
      console.error('리뷰 불려오는 중 에러', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasNextPage, isLoading, roomId]);

  return {
    reviews,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
}
