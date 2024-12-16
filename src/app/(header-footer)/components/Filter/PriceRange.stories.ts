import type { Meta, StoryObj } from '@storybook/react';
import PriceRange from './PriceRange';

const meta = {
  title: 'Filter/PriceRange',
  component: PriceRange,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PriceRange>;

export default meta;

type Story = StoryObj<typeof PriceRange>;

export const Default: Story = {};
