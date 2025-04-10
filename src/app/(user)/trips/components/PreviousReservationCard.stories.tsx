import type { Meta, StoryObj } from '@storybook/react';
import { PreviousReservationCard } from './PreviousReservationCard';

const meta: Meta<typeof PreviousReservationCard> = {
  title: 'User/Trips/PreviousReservationCard',
  component: PreviousReservationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PreviousReservationCard>;

export const Default: Story = {
  args: {
    thumbnail: 'https://picsum.photos/400/400',
    location: '서울특별시 강남구',
    hostName: '김호스트',
    checkIn: '2024.01.15',
    checkOut: '2024.01.20',
  },
};