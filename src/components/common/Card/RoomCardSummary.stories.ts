import type { Meta, StoryObj } from '@storybook/react';
import RoomCardSummary from '@/components/common/Card/RoomCardSummary';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Card/RoomCardSummary',
  // Story에서 사용할 실제 컴포넌트
  component: RoomCardSummary,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomCardSummary>;

export default meta;

type Story = StoryObj<typeof RoomCardSummary>;

export const Default: Story = {
  args: {
    location: '한국 Jangam-myeon,Buyeo',
    price: 239647,
    rating: 4.92,
    review: '정말정말 잘 쉬다가 갑니다',
  },
};
