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

export const Default: Story = {
  args: {
    checkIn: '15:00',
    checkOut: '11:00',
    rules: [
      {
        id: 1,
        category: '숙박 중',
        title: '게스트 정원 2명',
        icon: 'SYSTEM_FAMILY',
      },
    ],
  },
};
