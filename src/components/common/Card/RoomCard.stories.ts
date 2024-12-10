import type { Meta, StoryObj } from '@storybook/react';
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

const DUMMY_IMAGES = [
  'https://picsum.photos/400/400?random=1',
  'https://picsum.photos/400/400?random=2',
  'https://picsum.photos/400/400?random=3',
  'https://picsum.photos/400/400?random=4',
  'https://picsum.photos/400/400?random=5',
];

// 기본 상태
export const Default: Story = {
  args: {
    id: 1,
    images: DUMMY_IMAGES,
    location: '한국 Jangam-myeon,Buyeo',
    distance: '149',
    dates: '12월 15일 ~ 20일',
    price: 239647,
    rating: 4.92,
    review: '정말정말 잘 쉬다가 갑니다',
  },
};
