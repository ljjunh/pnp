import type { Meta, StoryObj } from '@storybook/react';
import { AllMessageHeader } from './AllMessageHeader';

const meta = {
  title: 'MESSAGES/AllMessageHeader',
  component: AllMessageHeader,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex w-96 items-center justify-between border px-6 py-6">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof AllMessageHeader>;

export default meta;
type Story = StoryObj<typeof AllMessageHeader>;

export const Default: Story = {
  args: {
    toggleSearchBar: () => console.log('Search toggled'),
  },
};
