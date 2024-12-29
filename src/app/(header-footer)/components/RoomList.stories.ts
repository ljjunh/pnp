import RoomList from '@/app/(header-footer)/components/RoomList';
import type { Meta, StoryObj } from '@storybook/react';
import { StoryFilterRoom } from '@/types/room';

const meta = {
  title: 'Main/RoomList',
  component: RoomList,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomList>;

export default meta;

type Story = StoryObj<typeof RoomList>;

const DUMMY_ROOMS: StoryFilterRoom[] = [
  {
    id: 1,
    images: [
      { id: 1, imageLink: '/images/01.avif', orientation: 'LANDSCAPE' },
      { id: 2, imageLink: '/images/02.avif', orientation: 'PORTRAIT' },
      { id: 3, imageLink: '/images/03.avif', orientation: 'LANDSCAPE' },
      { id: 4, imageLink: '/images/04.avif', orientation: 'PORTRAIT' },
      { id: 5, imageLink: '/images/05.avif', orientation: 'LANDSCAPE' },
      { id: 6, imageLink: '/images/06.avif', orientation: 'PORTRAIT' },
    ],
    location: '서울 강남구',
    price: 150000,
    latitude: 33.495797,
    longitude: 126.425996,
    reviewsAverage: 4.95,
  },
  {
    id: 2,
    images: [
      { id: 1, imageLink: '/images/03.avif', orientation: 'LANDSCAPE' },
      { id: 2, imageLink: '/images/02.avif', orientation: 'PORTRAIT' },
      { id: 3, imageLink: '/images/01.avif', orientation: 'LANDSCAPE' },
      { id: 4, imageLink: '/images/04.avif', orientation: 'PORTRAIT' },
      { id: 5, imageLink: '/images/06.avif', orientation: 'LANDSCAPE' },
      { id: 6, imageLink: '/images/05.avif', orientation: 'PORTRAIT' },
    ],
    location: '서울 마포구',
    price: 120000,
    latitude: 33.495797,
    longitude: 126.425996,
    reviewsAverage: 4.95,
  },
  {
    id: 3,
    images: [
      { id: 1, imageLink: '/images/06.avif', orientation: 'LANDSCAPE' },
      { id: 2, imageLink: '/images/05.avif', orientation: 'PORTRAIT' },
      { id: 3, imageLink: '/images/04.avif', orientation: 'LANDSCAPE' },
      { id: 4, imageLink: '/images/03.avif', orientation: 'PORTRAIT' },
      { id: 5, imageLink: '/images/02.avif', orientation: 'LANDSCAPE' },
      { id: 6, imageLink: '/images/01.avif', orientation: 'PORTRAIT' },
    ],
    location: '서울 용산구',
    price: 180000,
    latitude: 33.495797,
    longitude: 126.425996,
    reviewsAverage: 4.95,
  },
  {
    id: 4,
    images: [
      { id: 1, imageLink: '/images/01.avif', orientation: 'LANDSCAPE' },
      { id: 2, imageLink: '/images/03.avif', orientation: 'PORTRAIT' },
      { id: 3, imageLink: '/images/05.avif', orientation: 'LANDSCAPE' },
      { id: 4, imageLink: '/images/02.avif', orientation: 'PORTRAIT' },
      { id: 5, imageLink: '/images/04.avif', orientation: 'LANDSCAPE' },
      { id: 6, imageLink: '/images/06.avif', orientation: 'PORTRAIT' },
    ],
    location: '서울 중구',
    price: 200000,
    latitude: 33.495797,
    longitude: 126.425996,
    reviewsAverage: 4.95,
  },
  {
    id: 5,
    images: [
      { id: 1, imageLink: '/images/03.avif', orientation: 'LANDSCAPE' },
      { id: 2, imageLink: '/images/02.avif', orientation: 'PORTRAIT' },
      { id: 3, imageLink: '/images/01.avif', orientation: 'LANDSCAPE' },
      { id: 4, imageLink: '/images/06.avif', orientation: 'PORTRAIT' },
      { id: 5, imageLink: '/images/05.avif', orientation: 'LANDSCAPE' },
      { id: 6, imageLink: '/images/04.avif', orientation: 'PORTRAIT' },
    ],
    location: '서울 성동구',
    price: 130000,
    latitude: 33.495797,
    longitude: 126.425996,
    reviewsAverage: 4.95,
  },
];

// 기본 상태
export const Default: Story = {
  args: {
    rooms: DUMMY_ROOMS,
  },
};
