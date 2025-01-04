import RoomBookingButton from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingButton';
import type { Meta, StoryFn } from '@storybook/react';

const meta = {
  title: 'Rooms/Booking/RoomBookingButton',
  component: RoomBookingButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RoomBookingButton>;

export default meta;

export const Default: StoryFn<typeof RoomBookingButton> = () => {
  return (
    <RoomBookingButton
      roomId={1}
      guestCounts={{
        adults: 2,
        children: 2,
        infants: 0,
        pets: 0,
      }}
      dates={{
        checkIn: new Date('2024-12-22'),
        checkOut: new Date('2024-12-23'),
      }}
    />
  );
};
