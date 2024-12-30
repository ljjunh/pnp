import type { Meta, StoryObj } from '@storybook/react';
import { ImageLink } from '@/types/room';
import RoomCard from '@/components/common/Card/RoomCard';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Card/RoomCard',
  // Story에서 사용할 실제 컴포넌트
  component: RoomCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomCard>;

export default meta;

type Story = StoryObj<typeof RoomCard>;

const DUMMY_IMAGES: ImageLink[] = [
  { id: 1, imageLink: '/images/03.avif', orientation: 'LANDSCAPE' },
  { id: 2, imageLink: '/images/02.avif', orientation: 'PORTRAIT' },
  { id: 3, imageLink: '/images/01.avif', orientation: 'LANDSCAPE' },
  { id: 4, imageLink: '/images/06.avif', orientation: 'PORTRAIT' },
  { id: 5, imageLink: '/images/05.avif', orientation: 'LANDSCAPE' },
  { id: 6, imageLink: '/images/04.avif', orientation: 'PORTRAIT' },
];

// 기본 상태
export const Default: Story = {
  args: {
    id: 1,
    images: DUMMY_IMAGES,
    location: '한국 Jangam-myeon,Buyeo',
    price: 239647,
    rating: 4.92,
    review: '정말정말 잘 쉬다가 갑니다',
  },
};
