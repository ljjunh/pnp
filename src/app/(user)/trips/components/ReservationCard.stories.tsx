import type { Meta, StoryObj } from '@storybook/react';
import { ReservationCard } from './ReservationCard';

const meta: Meta<typeof ReservationCard> = {
  title: 'Trips/ReservationCard',
  component: ReservationCard,
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
type Story = StoryObj<typeof ReservationCard>;

export const Default: Story = {};
