import { useState } from 'react';
import RoomBookingDropdown from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingDropdown';
import type { Meta, StoryFn } from '@storybook/react';

const meta = {
  title: 'Rooms/Booking/RoomBookingDropdown',
  component: RoomBookingDropdown,
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
} satisfies Meta<typeof RoomBookingDropdown>;

export default meta;

export const Default: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestCounts, setGuestCounts] = useState({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleGuestChange = (type: keyof typeof guestCounts, value: number) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <RoomBookingDropdown
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
      guestCounts={guestCounts}
      onGuestChange={handleGuestChange}
    />
  );
};
