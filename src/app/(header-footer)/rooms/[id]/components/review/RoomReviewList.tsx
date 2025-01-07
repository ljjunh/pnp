import Link from 'next/link';
import RoomReviewItem from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewItem';
import RoomReviewSummary from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewSummary';
import { Room } from '@/types/room';
import Button from '@/components/common/Button/Button';
import { GetReviewsResponse, getReviews } from '@/apis/reviews/queries';
import { CACHE_TAGS } from '@/constants/cacheTags';
import { ROUTES } from '@/constants/routeURL';

interface RoomReviewListProps {
  roomId: number;
  reviewsCount: Room['reviewsCount'];
  reviewsAverage: Room['reviewsAverage'];
}

export default async function RoomReviewList({
  roomId,
  reviewsCount,
  reviewsAverage,
}: RoomReviewListProps) {
  const review: GetReviewsResponse = await getReviews(roomId, 1, 6, {
    next: { tags: [CACHE_TAGS.REVIEWS.DETAIL(roomId)] },
  });

  return (
    <section className="py-12">
      <RoomReviewSummary
        reviewsCount={reviewsCount}
        reviewsAverage={reviewsAverage}
        cleanliness={review.data.cleanliness}
        accuracy={review.data.accuracy}
        checkIn={review.data.checkIn}
        communication={review.data.communication}
        location={review.data.location}
        value={review.data.value}
      />
      {reviewsCount > 0 && (
        <div className="mt-10 grid grid-cols-2 grid-rows-3 gap-10">
          {review.data.reviews.map((review) => (
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
            />
          ))}
        </div>
      )}
      <div className="border-b border-neutral-04 py-10">
        <Button variant="tertiary">
          <Link href={ROUTES.ROOMS.REVIEWS(roomId)}>
            {reviewsCount > 0 ? `후기 ${reviewsCount} 개 모두 보기` : '첫 번째 후기를 작성해보세요'}
          </Link>
        </Button>
      </div>
    </section>
  );
}
