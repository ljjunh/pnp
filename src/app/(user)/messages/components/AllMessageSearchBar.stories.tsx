import type { Meta, StoryObj } from '@storybook/react';
import { AllMessageSearchBar } from './AllMessageSearchBar';

const meta = {
  title: 'User/Messages/AllMessageSearchBar',
  component: AllMessageSearchBar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex w-[480px] items-center p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof AllMessageSearchBar>;

export default meta;
type Story = StoryObj<typeof AllMessageSearchBar>;

export const Default: Story = {
  args: {
    toggleSearchBar: () => console.log('Search bar toggled'),
  },
};