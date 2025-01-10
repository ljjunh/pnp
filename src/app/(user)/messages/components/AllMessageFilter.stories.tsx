import type { Meta, StoryObj } from '@storybook/react';
import { filterItems } from '@/types/message';
import { AllMessageFilter } from './AllMessageFilter';

const meta = {
  title: 'User/Messages/AllMessageFilter',
  component: AllMessageFilter,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[480px] p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof AllMessageFilter>;

export default meta;
type Story = StoryObj<typeof AllMessageFilter>;

export const Default: Story = {
  args: {
    showFilter: false,
    toggleFilter: () => console.log('Filter toggled'),
    filterItems,
  },
};

export const Opened: Story = {
  args: {
    showFilter: true,
    toggleFilter: () => console.log('Filter toggled'),
    filterItems,
  },
};
