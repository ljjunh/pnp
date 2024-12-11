import { useState } from 'react';
import RoomBookingCalendar from '@/app/(header-footer)/rooms/[id]/components/booking/RoomBookingCalendar';
import type { Meta, StoryFn } from '@storybook/react';

const meta = {
  title: 'Rooms/Booking/RoomBookingCalendar',
  component: RoomBookingCalendar,
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
} satisfies Meta<typeof RoomBookingCalendar>;

export default meta;

export const Default: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <RoomBookingCalendar
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
      startDate={dateRange.startDate}
      endDate={dateRange.endDate}
      onDateChange={handleDateChange}
    />
  );
};
