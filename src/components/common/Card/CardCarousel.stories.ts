import type { Meta, StoryObj } from '@storybook/react';
import CardCarousel from '@/components/common/Card/CardCarousel';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Card/CardCarousel',
  // Story에서 사용할 실제 컴포넌트
  component: CardCarousel,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CardCarousel>;

export default meta;

type Story = StoryObj<typeof CardCarousel>;

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
