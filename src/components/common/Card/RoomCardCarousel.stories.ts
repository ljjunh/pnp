import type { Meta, StoryObj } from '@storybook/react';
import { ImageLink } from '@/types/room';
import RoomCardCarousel from '@/components/common/Card/RoomCardCarousel';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Card/RoomCardCarousel',
  // Story에서 사용할 실제 컴포넌트
  component: RoomCardCarousel,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomCardCarousel>;

export default meta;

type Story = StoryObj<typeof RoomCardCarousel>;

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
    images: DUMMY_IMAGES,
    liked: false,
  },
};

// 좋아요 된 상태
export const Liked: Story = {
  args: {
    images: DUMMY_IMAGES,
    liked: true,
  },
};

// 이미지가 한 장일 때
export const SingleImage: Story = {
  args: {
    images: [DUMMY_IMAGES[0]],
    liked: false,
  },
};
