import { IoIosStar } from 'react-icons/io';

interface CardSummaryProps {
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  review?: string;
}

export default function CardSummary({
  location,
  distance,
  dates,
  price,
  rating,
  review,
}: CardSummaryProps) {
  return (
    <div className="flex flex-col">
      {/* 주소, 평점 */}
      <div className="flex items-center justify-between">
        <div className="text-shade-02">{location}</div>
        <div className="flex items-center gap-1">
          <IoIosStar />
          <span>{rating}</span>
        </div>
      </div>
      {/* TODO : 내 현재위치와의 거리(이거 가능하려나?) */}
      <div className="text-neutral-07">{distance}km 거리</div>

      {/* TODO: 날짜 포멧팅 해야함 ex) 12월 15일~20일 */}
      <div className="text-neutral-07">{dates}</div>

      {/* TODO : 리뷰 */}
      {review && (
        <div>
          <span className="text-neutral-07">게스트 한마디 </span>
          <span>&ldquo;{review}&rdquo;</span>
        </div>
      )}

      {/* 가격 */}
      <div className="mt-2">
        <span>₩{price.toLocaleString()}</span>
        <span className="font-normal"> /박</span>
      </div>
    </div>
  );
}
