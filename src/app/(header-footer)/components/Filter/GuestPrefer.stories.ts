import type { Meta, StoryObj } from '@storybook/react';
import GuestPrefer from './GuestPrefer';

const meta = {
  title: 'Filter/GuestPrefer',
  component: GuestPrefer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GuestPrefer>;

export default meta;

type Story = StoryObj<typeof GuestPrefer>;

export const Default: Story = {};
