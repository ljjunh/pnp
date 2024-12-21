import RoomReviewSummary from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewSummary';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/review/RoomReviewSummary',
  component: RoomReviewSummary,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomReviewSummary>;

export default meta;

type Story = StoryObj<typeof RoomReviewSummary>;

export const Default: Story = {
  args: {
    reviewsCount: 60,
    reviewsAverage: 4.816666666,
    accuracy: 4.8167,
    communication: 4.8167,
    cleanliness: 4.8167,
    location: 4.8167,
    checkIn: 4.8167,
    value: 4.8167,
  },
};
