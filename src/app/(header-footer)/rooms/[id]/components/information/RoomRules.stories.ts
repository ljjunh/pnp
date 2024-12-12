import RoomRules from '@/app/(header-footer)/rooms/[id]/components/information/RoomRules';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/Information/RoomRules',
  component: RoomRules,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomRules>;

export default meta;

type Story = StoryObj<typeof RoomRules>;

export const Default: Story = {};
