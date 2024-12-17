import type { Meta, StoryObj } from '@storybook/react';
import RoomAndBed from './RoomAndBed';

const meta = {
  title: 'Filter/RoomAndBed',
  component: RoomAndBed,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomAndBed>;

export default meta;

type Story = StoryObj<typeof RoomAndBed>;

export const Default: Story = {};
