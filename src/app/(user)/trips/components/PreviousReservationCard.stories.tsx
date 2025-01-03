import type { Meta, StoryObj } from '@storybook/react';
import { PreviousReservationCard } from './PreviousReservationCard';

const meta: Meta<typeof PreviousReservationCard> = {
  title: 'Trips/ReservationCard',
  component: PreviousReservationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PreviousReservationCard>;

export const Default: Story = {};
