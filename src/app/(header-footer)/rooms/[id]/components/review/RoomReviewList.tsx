import Button from '@/components/common/Button/Button';
import { IoIosStar } from 'react-icons/io';

const DUMMY_REVIEWS = [
  {
    id: 1,
    username: '여행자123',
    nationality: '대한민국',
    rating: 3,
    timePassed: '4주 전',
    stayDuration: '하룻밤 숙박',
    review:
      '숙소가 정말 독특해요! 침실에서 바라보는 풍경은 꿈이 현실이 되며, 밤의 별은 몇 군데에서처럼 선명하게 볼 수 있습니다. 특히 환상적인 야외 욕조와 사교적인 테라스가 있어 숙박을 더욱 특별하게 해줘요',
  },
  {
    id: 2,
    username: 'Alex',
    nationality: '미국',
    rating: 4.5,
    timePassed: '1달 전',
    stayDuration: '2박 숙박',
    review: '아름다운 전망과 편안한 침대가 인상적이었습니다. 호스트도 매우 친절했어요.',
  },
  {
    id: 3,
    username: 'Yuki',
    nationality: '일본',
    rating: 3,
    timePassed: '2달 전',
    stayDuration: '3박 숙박',
    review: '조용하고 아늑한 공간이었습니다. 다음에도 꼭 방문하고 싶어요.',
  },
  {
    id: 4,
    username: 'Maria',
    nationality: '스페인',
    rating: 4.8,
    timePassed: '3달 전',
    stayDuration: '1박 숙박',
    review: '현지 문화를 체험할 수 있는 좋은 기회였습니다.',
  },
  {
    id: 5,
    username: '김여행',
    nationality: '대한민국',
    rating: 4.7,
    timePassed: '3달 전',
    stayDuration: '2박 숙박',
    review: '청결하고 아늑한 공간이에요. 호스트님의 세심한 배려가 느껴졌습니다.',
  },
  {
    id: 6,
    username: 'Sophie',
    nationality: '프랑스',
    rating: 4.9,
    timePassed: '4달 전',
    stayDuration: '4박 숙박',
    review: '완벽한 휴가를 보낼 수 있는 곳이에요. 강력 추천합니다!',
  },
];

export default function RoomReviewList() {
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="text-xs"
          >
            <IoIosStar className={rating >= star ? 'text-black' : 'text-gray-200'} />
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-10 border-b">
      <div className="grid grid-cols-2 grid-rows-3 gap-10">
        {DUMMY_REVIEWS.map((review) => (
          <div key={review.id}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-black"></div>
                <div>
                  <div className="font-semibold">{review.username}</div>
                  <div className="text-sm text-shade-02">{review.nationality}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <StarRating rating={review.rating} />
                <span className="text-neutral-07">·</span>
                <div>{review.timePassed}</div>
                <span className="text-neutral-07">·</span>
                <div className="text-neutral-07">{review.stayDuration}</div>
              </div>
            </div>
            <div className="mt-1 text-shade-02">{review.review}</div>
          </div>
        ))}
      </div>
      <div className="py-10">
        <Button variant="tertiary">후기 293개 모두 보기</Button>
      </div>
    </div>
  );
}
