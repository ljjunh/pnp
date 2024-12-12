import { GoComment } from 'react-icons/go';
import { IoIosStar } from 'react-icons/io';
import { PiCheckCircle, PiKey, PiMapTrifold, PiSprayBottle, PiTag } from 'react-icons/pi';

export default function RoomReviewSummary() {
  return (
    <div className="border-b pb-10">
      <div className="flex items-center pb-10 text-2xl">
        <span className="mr-2">
          <IoIosStar />
        </span>
        <span className="font-semibold">4.86 · 후기 293개</span>
      </div>
      <div className="grid grid-cols-6">
        <div className="flex flex-col gap-5 px-6">
          <div>
            <div className="text-sm">청결도</div>
            <div className="text-lg font-semibold">4.8</div>
          </div>
          <PiSprayBottle size={32} />
        </div>
        <div className="flex flex-col gap-5 border-l px-6">
          <div>
            <div className="text-sm">정확도</div>
            <div className="text-lg font-semibold">4.8</div>
          </div>
          <PiCheckCircle size={32} />
        </div>
        <div className="flex flex-col gap-5 border-l px-6">
          <div>
            <div className="text-sm">체크인</div>
            <div className="text-lg font-semibold">4.9</div>
          </div>
          <PiKey size={32} />
        </div>
        <div className="flex flex-col gap-5 border-l px-6">
          <div>
            <div className="text-sm">의사소통</div>
            <div className="text-lg font-semibold">4.9</div>
          </div>
          <GoComment size={32} />
        </div>
        <div className="flex flex-col gap-5 border-l px-6">
          <div>
            <div className="text-sm">위치</div>
            <div className="text-lg font-semibold">4.8</div>
          </div>
          <PiMapTrifold size={32} />
        </div>
        <div className="flex flex-col gap-5 border-l px-6">
          <div>
            <div className="text-sm">가격 대비 만족도</div>
            <div className="text-lg font-semibold">4.7</div>
          </div>
          <PiTag size={32} />
        </div>
      </div>
    </div>
  );
}
