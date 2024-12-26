import type { Meta, StoryObj } from '@storybook/react';
import { Help } from './Help';

const meta: Meta<typeof Help> = {
  title: 'Trips/Help',
  component: Help,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Help>;

export const Default: Story = {};
