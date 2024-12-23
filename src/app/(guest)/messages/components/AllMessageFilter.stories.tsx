import { filterItems } from '@/app/(guest)/messages/page';
import type { Meta, StoryObj } from '@storybook/react';
import { AllMessageFilter } from './AllMessageFilter';

const meta = {
  title: 'MESSAGES/AllMessageFilter',
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
