import RoomList from '@/app/(header-footer)/components/RoomList';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Main/RoomList',
  component: RoomList,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomList>;

export default meta;

type Story = StoryObj<typeof RoomList>;

const DUMMY_ROOMS = [
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
// 기본 상태
export const Default: Story = {
  args: {
    rooms: DUMMY_ROOMS,
  },
};
