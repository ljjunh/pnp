import type { Meta, StoryObj } from '@storybook/react';
import Accessibility from './Accessibility';

const meta = {
  title: 'Filter/Accessibility',
  component: Accessibility,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Accessibility>;

export default meta;

type Story = StoryObj<typeof Accessibility>;

export const Default: Story = {};
