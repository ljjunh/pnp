import type { Meta, StoryObj } from '@storybook/react';
import { MessageHeader } from './MessageHeader';

const meta = {
  title: 'User/Messages/MessageHeader',
  component: MessageHeader,
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
} satisfies Meta<typeof MessageHeader>;

export default meta;
type Story = StoryObj<typeof MessageHeader>;

export const Default: Story = {
  args: {
    showReservation: false,
    toggleReservation: () => console.log('Toggle reservation clicked'),
  },
};