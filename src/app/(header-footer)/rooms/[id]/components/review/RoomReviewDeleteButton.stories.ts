import RoomReviewDeleteButton from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewDeleteButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/review/RoomReviewDeleteButton',
  component: RoomReviewDeleteButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomReviewDeleteButton>;

export default meta;

type Story = StoryObj<typeof RoomReviewDeleteButton>;

export const Default: Story = {
  args: {
    roomId: 1,
    reviewId: 1,
  },
};
