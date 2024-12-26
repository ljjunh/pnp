import type { Meta, StoryFn } from '@storybook/react';
import RoomBookingCard from './RoomBookingCard';

const meta = {
  title: 'Rooms/Booking/RoomBookingCard',
  component: RoomBookingCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RoomBookingCard>;

export default meta;

// 기본 상태
export const Default: StoryFn = () => (
  <RoomBookingCard
    price={60000}
    roomId={1}
  />
);
