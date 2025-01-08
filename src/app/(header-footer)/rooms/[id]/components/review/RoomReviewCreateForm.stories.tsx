import RoomReviewCreateForm from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewCreateForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/review/RoomReviewCreateForm',
  component: RoomReviewCreateForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RoomReviewCreateForm>;

export default meta;

type Story = StoryObj<typeof RoomReviewCreateForm>;

export const Default: Story = {
  args: {
    roomId: 1,
    isAvailable: ['1111-1111-1111'],
  },
};
