import type { Meta, StoryObj } from '@storybook/react';
import { RoomInformation } from './RoomInformation';

const meta = {
  title: 'User/Reservations/RoomInformation',
  component: RoomInformation,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex w-[480px] flex-col gap-3 border bg-white px-2">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof RoomInformation>;

export default meta;
type Story = StoryObj<typeof RoomInformation>;

// 기본 상태
export const Default: Story = {};
