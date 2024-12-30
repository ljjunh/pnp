import RoomReviewEditButton from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewEditButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/review/RoomReviewEditButton',
  component: RoomReviewEditButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomReviewEditButton>;

export default meta;

type Story = StoryObj<typeof RoomReviewEditButton>;

export const Default: Story = {
  args: {
    roomId: 1,
    reviewId: 1,
    editingContent: '댓글 내용',
    onClose: () => console.log('수정 모드 종료'),
    editRatings: {
      accuracy: 5,
      communication: 5,
      cleanliness: 5,
      location: 5,
      checkIn: 5,
      value: 5,
    },
  },
};
