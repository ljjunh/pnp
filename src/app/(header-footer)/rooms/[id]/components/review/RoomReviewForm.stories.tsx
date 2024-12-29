import RoomReviewForm from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/review/RoomReviewForm',
  component: RoomReviewForm,
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
} satisfies Meta<typeof RoomReviewForm>;

export default meta;

type Story = StoryObj<typeof RoomReviewForm>;

export const Default: Story = {
  args: {
    roomId: 1,
  },
};
