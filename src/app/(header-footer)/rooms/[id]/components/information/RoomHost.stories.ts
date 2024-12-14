import RoomHost from '@/app/(header-footer)/rooms/[id]/components/information/RoomHost';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/Information/RoomHost',
  component: RoomHost,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomHost>;

export default meta;

type Story = StoryObj<typeof RoomHost>;

export const Default: Story = {};
