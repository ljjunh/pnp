import type { Meta, StoryObj } from '@storybook/react';
import CardSummary from '@/components/common/Card/CardSummary';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Card/CardSummary',
  // Story에서 사용할 실제 컴포넌트
  component: CardSummary,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CardSummary>;

export default meta;

type Story = StoryObj<typeof CardSummary>;

export const Default: Story = {
  args: {
    location: '한국 Jangam-myeon,Buyeo',
    distance: '149',
    dates: '12월 15일 ~ 20일',
    price: 239647,
    rating: 4.92,
    review: '정말정말 잘 쉬다가 갑니다',
  },
};
