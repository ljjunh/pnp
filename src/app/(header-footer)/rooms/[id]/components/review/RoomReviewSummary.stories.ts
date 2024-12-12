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

export const Default: Story = {};
