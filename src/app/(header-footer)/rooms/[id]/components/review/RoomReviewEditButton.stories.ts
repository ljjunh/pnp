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
    editingContent: '댓글 내용',
    onClose: () => console.log('수정 모드 종료'),
  },
};
