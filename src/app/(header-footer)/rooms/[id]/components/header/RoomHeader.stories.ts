import RoomHeader from '@/app/(header-footer)/rooms/[id]/components/header/RoomHeader';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/Header/RoomHeader',
  component: RoomHeader,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomHeader>;

export default meta;

type Story = StoryObj<typeof RoomHeader>;

export const Default: Story = {
  args: {
    title: '한옥독채/거실겸큰방1/작은방1/설악해변도보3분/낙산사/설악산',
    roomId: 1,
  },
};
