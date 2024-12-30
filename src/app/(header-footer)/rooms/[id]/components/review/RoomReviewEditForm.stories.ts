import RoomReviewEditForm from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewEditForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/review/RoomReviewEditForm',
  component: RoomReviewEditForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomReviewEditForm>;

export default meta;

type Story = StoryObj<typeof RoomReviewEditForm>;

const mockInitialRatings = {
  accuracy: 4,
  cleanliness: 5,
  checkIn: 5,
  communication: 3,
  location: 4,
  value: 5,
};

export const Default: Story = {
  args: {
    roomId: 1,
    reviewId: 10033,
    initialContent: '정말 좋은 숙소였습니다. 다음에도 방문하고 싶네요!',
    initialRatings: mockInitialRatings,
    onCancel: () => alert('취소 버튼 클릭'),
    onClose: () => alert('닫기 호출'),
  },
};
