import Link from 'next/link';
import RoomReviewItem from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewItem';
import Button from '@/components/common/Button/Button';
import { ROUTES } from '@/constants/routeURL';

interface RoomReviewListProps {
  id: number;
}

const DUMMY_REVIEWS = [
  {
    id: 1,
    rating: 3,
    content:
      '숙소가 정말 독특해요! 침실에서 바라보는 풍경은 꿈이 현실이 되며, 밤의 별은 몇 군데에서처럼 선명하게 볼 수 있습니다. 특히 환상적인 야외 욕조와 사교적인 테라스가 있어 숙박을 더욱 특별하게 해줘요',
    createdAt: '2024-12-16T05:28:59.000Z',
    user: {
      id: '0f6f5982-fd57-49ac-a472-933808a48297',
      image:
        'https://a0.muscache.com/im/pictures/user/User/original/904cfa12-d9b0-418b-9e38-eb51bc97c2b1.jpeg',
      name: '진섭',
      startedAt: '2024-12-09T23:49:58.079Z',
    },
  },
  {
    id: 2,
    rating: 4,
    content: '아름다운 전망과 편안한 침대가 인상적이었습니다. 호스트도 매우 친절했어요.',
    createdAt: '2024-12-15T05:28:59.000Z',
    user: {
      id: 'b4e02c2e-b1d0-41cb-878c-b55e407ed403',
      image:
        'https://a0.muscache.com/im/pictures/user/User-427758195/original/9644e4dd-8cfb-44bc-aff7-56aba18d3cfe.jpeg',
      name: '경선',
      startedAt: '2024-12-15T10:49:58.079Z',
    },
  },
  {
    id: 3,
    rating: 3,
    content: '조용하고 아늑한 공간이었습니다. 다음에도 꼭 방문하고 싶어요.',
    createdAt: '2024-12-01T05:28:59.000Z',
    user: {
      id: '573393f6-a8e3-4566-a2a2-237496d0f87b',
      image: 'https://a0.muscache.com/im/users/38447721/profile_pic/1437126415/original.jpg',
      name: '아린',
      startedAt: '2024-12-15T23:49:58.079Z',
    },
  },
  {
    id: 4,
    rating: 4.8,
    content: '현지 문화를 체험할 수 있는 좋은 기회였습니다.',
    createdAt: '2024-11-24T05:28:59.000Z',
    user: {
      id: 'acc25a36-d437-4bc7-a256-52b29d17bf61',
      image:
        'https://a0.muscache.com/im/pictures/user/User-300910093/original/4fa5e373-c8bb-4889-99b4-b2be33224d86.jpeg',
      name: '채나',
      startedAt: '2023-08-08T23:49:58.079Z',
    },
  },
  {
    id: 5,
    rating: 4,
    content: '청결하고 아늑한 공간이에요. 호스트님의 세심한 배려가 느껴졌습니다.',
    createdAt: '2024-11-02T05:28:59.000Z',
    user: {
      id: '3cb69b0c-9c99-4647-aa68-a2fd761aba4e',
      image:
        'https://a0.muscache.com/im/pictures/user/User-447500949/original/3ea7eded-529e-49f3-b907-d2a53ee90bf8.jpeg',
      name: '예진',
      startedAt: '2022-07-09T23:49:58.079Z',
    },
  },
  {
    id: 6,
    rating: 4,
    content: '완벽한 휴가를 보낼 수 있는 곳이에요. 강력 추천합니다!',
    createdAt: '2024-02-24T05:28:59.000Z',
    user: {
      id: '3e779577-9da6-4526-b438-0ba444f5bde6',
      image: 'https://a0.muscache.com/im/pictures/user/ad0f9673-4bed-4173-b606-e9c82782c9a8.jpg',
      name: '지영',
      startedAt: '2023-06-03T23:49:58.079Z',
    },
  },
];

export default function RoomReviewList({ id }: RoomReviewListProps) {
  return (
    <div className="mt-10 border-b">
      <div className="grid grid-cols-2 grid-rows-3 gap-10">
        {DUMMY_REVIEWS.map((review) => (
          <RoomReviewItem
            key={review.id}
            rating={review.rating}
            content={review.content}
            createdAt={review.createdAt}
            user={review.user}
          />
        ))}
      </div>
      <div className="py-10">
        <Button variant="tertiary">
          <Link href={ROUTES.ROOMS.REVIEWS(id)}>후기 293개 모두 보기</Link>
        </Button>
      </div>
    </div>
  );
}
