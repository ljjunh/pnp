import type { Meta, StoryObj } from '@storybook/react';
import { TripRoomInformation } from './TripRoomInformation';

const meta = {
  title: 'User/Reservations/TripRoomInformation',
  component: TripRoomInformation,
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
} satisfies Meta<typeof TripRoomInformation>;

export default meta;
type Story = StoryObj<typeof TripRoomInformation>;

// 기본 상태
export const Default: Story = {};
