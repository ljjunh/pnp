import RoomReviewList from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewList';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/review/RoomReviewList',
  component: RoomReviewList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomReviewList>;

export default meta;

type Story = StoryObj<typeof RoomReviewList>;

export const Default: Story = {
  args: {
    id: 1,
  },
};
