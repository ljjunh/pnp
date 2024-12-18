import RoomLocation from '@/app/(header-footer)/rooms/[id]/components/information/RoomLocation';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/Information/RoomLocation',
  component: RoomLocation,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomLocation>;

export default meta;

type Story = StoryObj<typeof RoomLocation>;

export const Default: Story = {
  args: {
    lat: 33.549652,
    lng: 126.652931,
    location: '제주시',
  },
};
