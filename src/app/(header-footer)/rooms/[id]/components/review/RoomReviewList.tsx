import Link from 'next/link';
import RoomReviewItem from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewItem';
import RoomReviewSummary from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewSummary';
import { Room } from '@/types/room';
import Button from '@/components/common/Button/Button';
import { GetReviewsResponse } from '@/apis/reviews/queries';
import { getReviews } from '@/apis/reviews/queries';
import { ROUTES } from '@/constants/routeURL';

interface RoomReviewListProps {
  id: number;
  reviewsCount: Room['reviewsCount'];
  reviewsAverage: Room['reviewsAverage'];
}

export default async function RoomReviewList({
  id,
  reviewsCount,
  reviewsAverage,
}: RoomReviewListProps) {
  const review: GetReviewsResponse = await getReviews(Number(id), 1, 6);

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
        <div className="mt-10 border-b">
          <div className="grid grid-cols-2 grid-rows-3 gap-10">
            {review.data.reviews.map((review) => (
              <RoomReviewItem
                key={review.id}
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

          <div className="py-10">
            <Button variant="tertiary">
              <Link href={ROUTES.ROOMS.REVIEWS(id)}>후기 {reviewsCount}개 모두 보기</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
