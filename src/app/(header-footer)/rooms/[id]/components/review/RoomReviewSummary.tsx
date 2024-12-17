import { ReviewSummarize } from '@/types/review';
import { Room } from '@/types/room';
import { GoComment } from 'react-icons/go';
import { IoIosStar } from 'react-icons/io';
import { PiCheckCircle, PiKey, PiMapTrifold, PiSprayBottle, PiTag } from 'react-icons/pi';

interface RoomReviewSummaryProps {
  reviewsCount: Room['reviewsCount'];
  reviewsAverage: Room['reviewsAverage'];
  cleanliness: ReviewSummarize['cleanliness'];
  accuracy: ReviewSummarize['accuracy'];
  checkIn: ReviewSummarize['checkIn'];
  communication: ReviewSummarize['communication'];
  location: ReviewSummarize['location'];
  value: ReviewSummarize['value'];
}

export default function RoomReviewSummary({
  reviewsCount,
  reviewsAverage,
  cleanliness,
  accuracy,
  checkIn,
  communication,
  location,
  value,
}: RoomReviewSummaryProps) {
  console.log(cleanliness, '왜왜왜');

  return (
    <div className="border-b pb-10">
      <div className="flex items-center pb-10 text-2xl">
        <span className="mr-2">
          <IoIosStar />
        </span>
        <span className="font-semibold">
          {reviewsAverage ? reviewsAverage.toFixed(2) : 0} · 후기 {reviewsCount ? reviewsCount : 0}
          개
        </span>
      </div>
      <div className="grid grid-cols-6">
        <div className="flex flex-col gap-5 px-6">
          <div>
            <div className="text-sm">청결도</div>
            <div className="text-lg font-semibold">{cleanliness.toFixed(2)}</div>
          </div>
          <PiSprayBottle size={32} />
        </div>
        <div className="flex flex-col gap-5 border-l px-6">
          <div>
            <div className="text-sm">정확도</div>
            <div className="text-lg font-semibold">{accuracy.toFixed(2)}</div>
          </div>
          <PiCheckCircle size={32} />
        </div>
        <div className="flex flex-col gap-5 border-l px-6">
          <div>
            <div className="text-sm">체크인</div>
            <div className="text-lg font-semibold">{checkIn.toFixed(2)}</div>
          </div>
          <PiKey size={32} />
        </div>
        <div className="flex flex-col gap-5 border-l px-6">
          <div>
            <div className="text-sm">의사소통</div>
            <div className="text-lg font-semibold">{communication.toFixed(2)}</div>
          </div>
          <GoComment size={32} />
        </div>
        <div className="flex flex-col gap-5 border-l px-6">
          <div>
            <div className="text-sm">위치</div>
            <div className="text-lg font-semibold">{location.toFixed(2)}</div>
          </div>
          <PiMapTrifold size={32} />
        </div>
        <div className="flex flex-col gap-5 border-l px-6">
          <div>
            <div className="text-sm">가격 대비 만족도</div>
            <div className="text-lg font-semibold">{value.toFixed(2)}</div>
          </div>
          <PiTag size={32} />
        </div>
      </div>
    </div>
  );
}
