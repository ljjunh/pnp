import RoomCard from '@/components/common/Card/RoomCard';

// 임시 더미 데이터 타입
interface Room {
  id: number;
  images: string[];
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  review?: string;
}

// 더미 데이터
const DUMMY_ROOMS: Room[] = [
  {
    id: 1,
    images: [
      '/images/01.avif',
      '/images/02.avif',
      '/images/03.avif',
      '/images/04.avif',
      '/images/05.avif',
      '/images/06.avif',
    ],
    location: '서울 강남구',
    distance: '2',
    dates: '9월 1일~2일',
    price: 150000,
    rating: 4.95,
    review: '부모님 모셔와도 좋을것같아요',
  },
  {
    id: 2,
    images: [
      '/images/03.avif',
      '/images/02.avif',
      '/images/01.avif',
      '/images/04.avif',
      '/images/06.avif',
      '/images/05.avif',
    ],
    location: '서울 마포구',
    distance: '5',
    dates: '8월 15일~16일',
    price: 120000,
    rating: 4.8,
    review: '정말정말 잘 쉬다 갑니다',
  },
  {
    id: 3,
    images: [
      '/images/04.avif',
      '/images/03.avif',
      '/images/06.avif',
      '/images/05.avif',
      '/images/02.avif',
      '/images/01.avif',
    ],
    location: '서울 용산구',
    distance: '3',
    dates: '8월 20일~21일',
    price: 180000,
    rating: 4.7,
    review: '시설이 좋아요',
  },
  {
    id: 4,
    images: [
      '/images/05.avif',
      '/images/02.avif',
      '/images/04.avif',
      '/images/01.avif',
      '/images/03.avif',
      '/images/06.avif',
    ],
    location: '서울 중구',
    distance: '1',
    dates: '9월 5일~6일',
    price: 200000,
    rating: 4.9,
    review: '깨끗해요',
  },
  {
    id: 5,
    images: [
      '/images/06.avif',
      '/images/03.avif',
      '/images/02.avif',
      '/images/04.avif',
      '/images/01.avif',
      '/images/05.avif',
    ],
    location: '서울 성동구',
    distance: '7',
    dates: '8월 25일~26일',
    price: 130000,
    rating: 4.85,
    review: '깔끔하네요',
  },
];

export default function RoomList() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      {DUMMY_ROOMS.map((room) => (
        <RoomCard
          key={room.id}
          id={room.id}
          images={room.images}
          location={room.location}
          distance={room.distance}
          dates={room.dates}
          price={room.price}
          rating={room.rating}
          review={room.review}
        />
      ))}
    </div>
  );
}
