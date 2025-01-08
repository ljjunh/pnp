import RoomReviewModalContent from '@/app/@modal/(.)rooms/[id]/reviews/components/RoomReviewModalContent';
import Modal from '@/components/common/Modal/Modal';
import { getReviewAvailable, getReviews } from '@/apis/reviews/queries';
import { calculateAverageRating } from '@/utils/calculateAverageRating';
import { CACHE_TAGS } from '@/constants/cacheTags';
import { GoComment } from 'react-icons/go';
import { PiCheckCircle, PiKey, PiMapTrifold, PiSprayBottle, PiTag } from 'react-icons/pi';

export default async function ReviewModal({ params }: { params: { id: string } }) {
  const review = await getReviews(Number(params.id), 1, 10, 'recent', {
    next: { tags: [CACHE_TAGS.REVIEWS.DETAIL(Number(params.id))] },
  });
  const isAvailable = await getReviewAvailable(Number(params.id));

  const rating = calculateAverageRating([
    review.data.accuracy,
    review.data.communication,
    review.data.cleanliness,
    review.data.location,
    review.data.checkIn,
    review.data.value,
  ]);

  return (
    <Modal>
      <div className="flex h-[80vh] px-16 py-6">
        {/* 왼쪽 컬럼 */}
        <div className="w-[360px]">
          <div className="mb-12 flex items-center gap-3">
            <span className="text-4xl">★</span>
            <span className="text-4xl font-medium">{rating.toFixed(2)}</span>
          </div>

          {/* 전체 평점 그래프 */}
          <div className="mb-3">
            <div className="mb-2 text-sm">전체 평점</div>
            {[5, 4, 3, 2, 1].map((num) => (
              <div
                key={num}
                className="flex items-center gap-1"
              >
                <span className="w-3 text-xs">{num}</span>
                <div className="h-1 flex-1 overflow-hidden rounded-lg bg-neutral-03">
                  <div
                    className="h-1 rounded-lg bg-shade-02"
                    style={{ width: num === 5 ? '90%' : '10%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 항목별 점수 */}
          <div>
            <div className="flex items-center justify-between border-b border-neutral-03 py-3 text-sm">
              <div className="flex items-center gap-4">
                <PiSprayBottle size={25} />
                <span>청결도</span>
              </div>
              <div>{review.data.cleanliness.toFixed(1)}</div>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-03 py-3 text-sm">
              <div className="flex items-center gap-4">
                <PiCheckCircle size={25} />
                <span>정확도</span>
              </div>
              <div>{review.data.accuracy.toFixed(1)}</div>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-03 py-3 text-sm">
              <div className="flex items-center gap-4">
                <PiKey size={25} />
                <span>체크인</span>
              </div>
              <div>{review.data.checkIn.toFixed(1)}</div>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-03 py-3 text-sm">
              <div className="flex items-center gap-4">
                <GoComment size={25} />
                <span>의사소통</span>
              </div>
              <div>{review.data.communication.toFixed(1)}</div>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-03 py-3 text-sm">
              <div className="flex items-center gap-4">
                <PiMapTrifold size={25} />
                <span>위치</span>
              </div>
              <div>{review.data.location.toFixed(1)}</div>
            </div>
            <div className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center gap-4">
                <PiTag size={25} />
                <span>가격 대비 만족도</span>
              </div>
              <div>{review.data.value.toFixed(1)}</div>
            </div>
          </div>
        </div>
        <RoomReviewModalContent
          review={review}
          roomId={Number(params.id)}
          isAvailable={isAvailable}
        />
      </div>
    </Modal>
  );
}
