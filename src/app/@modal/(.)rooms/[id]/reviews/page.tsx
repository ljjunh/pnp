import RoomReviewItem from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewItem';
import Modal from '@/components/common/Modal/Modal';
import { GetReviewsResponse } from '@/apis/reviews/queries';
import { getReviews } from '@/apis/reviews/queries';
import { GoComment } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { PiCheckCircle, PiKey, PiMapTrifold, PiSprayBottle, PiTag } from 'react-icons/pi';

export default async function ReviewModal({ params }: { params: { id: string } }) {
  const review: GetReviewsResponse = await getReviews(Number(params.id));
  const rating =
    [
      review.data.accuracy,
      review.data.communication,
      review.data.cleanliness,
      review.data.location,
      review.data.checkIn,
      review.data.value,
    ].reduce((sum, score) => sum + score, 0) / 6;

  return (
    <Modal>
      <div className="flex h-full px-16 py-6">
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

        {/* 오른쪽 컬럼 */}
        <div className="flex h-full w-[550px] flex-col pl-16">
          <div className="flex items-center justify-between">
            <span className="text-2xl">
              <span>후기</span>
              <span className="font-semibold"> {review.data.count}</span>
              <span>개</span>
            </span>
            <button className="flex items-center gap-2 rounded-full border border-neutral-03 px-2.5 py-1 text-xs">
              최신순
              <IoIosArrowDown size={20} />
            </button>
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

          <div className="space-y-8 pr-4">
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
        </div>
      </div>
    </Modal>
  );
}
