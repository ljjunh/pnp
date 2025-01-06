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
    availableDates={[
      '2024.11.01',
      '2024.11.02',
      '2024.11.03',
      '2024.11.04',
      '2024.11.05',
      '2024.11.06',
      '2024.11.07',
      '2024.11.08',
    ]}
  />
);
