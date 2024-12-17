import type { Meta, StoryObj } from '@storybook/react';
import BuildingOption from './BuildingOption';

const meta = {
  title: 'Filter/BuildingOption',
  component: BuildingOption,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BuildingOption>;

export default meta;

type Story = StoryObj<typeof BuildingOption>;

export const Default: Story = {};
