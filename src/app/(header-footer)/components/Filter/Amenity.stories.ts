import type { Meta, StoryObj } from '@storybook/react';
import Amenity from './Amenity';

const meta = {
  title: 'Filter/Amenity',
  component: Amenity,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Amenity>;

export default meta;

type Story = StoryObj<typeof Amenity>;

export const Default: Story = {};
