import PriceRange from '@/app/(header-footer)/components/filter/PriceRange';
import { FilterType } from '@/schemas/rooms';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Filter/PriceRange',
  component: PriceRange,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PriceRange>;

export default meta;

type Story = StoryObj<typeof PriceRange>;

export const Default: Story = {
  args: {
    roomType: 'Entire',
    property: 1,
    handleFilter: (newState: number, type: keyof FilterType) => {
      console.log(newState, type);
    },
  },
};
