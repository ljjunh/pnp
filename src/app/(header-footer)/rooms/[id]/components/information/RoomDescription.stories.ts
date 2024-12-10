import RoomDescription from '@/app/(header-footer)/rooms/[id]/components/information/RoomDescription';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/Information/RoomDescription',
  component: RoomDescription,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomDescription>;

export default meta;

type Story = StoryObj<typeof RoomDescription>;

export const Default: Story = {};
