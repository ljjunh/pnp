import RoomReviewRating from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewRating';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/review/RoomReviewRating',
  component: RoomReviewRating,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomReviewRating>;

export default meta;

type Story = StoryObj<typeof RoomReviewRating>;

export const Default: Story = {
  args: {
    label: '위치',
    value: 3,
    onChange: (value: number) => {
      console.log('Rating changed to:', value);
    },
  },
};
