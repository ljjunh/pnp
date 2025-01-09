import type { Meta, StoryObj } from '@storybook/react';
import { MessageInput } from './MessageInput';

const meta = {
  title: 'User/Messages/MessageInput',
  component: MessageInput,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[800px] border-t bg-white">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof MessageInput>;

export default meta;
type Story = StoryObj<typeof MessageInput>;

export const Default: Story = {};