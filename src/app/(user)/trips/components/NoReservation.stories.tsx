import type { Meta, StoryObj } from '@storybook/react';
import { NoReservation } from './NoReservation';

const meta: Meta<typeof NoReservation> = {
  title: 'User/Trips/NoReservation',
  component: NoReservation,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-6xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NoReservation>;

// 기본 스토리
export const Default: Story = {};
