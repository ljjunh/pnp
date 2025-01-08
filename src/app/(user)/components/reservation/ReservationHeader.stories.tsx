import type { Meta, StoryObj } from '@storybook/react';
import { ReservationHeader } from './ReservationHeader';

const meta = {
  title: 'User/Reservations/ReservationHeader',
  component: ReservationHeader,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[800px] border bg-white">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ReservationHeader>;

export default meta;
type Story = StoryObj<typeof ReservationHeader>;

export const Default: Story = {
  args: {
    toggleReservation: () => console.log('Reservation toggled'),
  },
};