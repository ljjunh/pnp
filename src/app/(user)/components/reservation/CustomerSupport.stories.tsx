import type { Meta, StoryObj } from '@storybook/react';
import { CustomerSupport } from './CustomerSupport';

const meta = {
  title: 'Reservations/CustomerSupport',
  component: CustomerSupport,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[480px] border bg-white">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CustomerSupport>;

export default meta;
type Story = StoryObj<typeof CustomerSupport>;

export const Default: Story = {};
