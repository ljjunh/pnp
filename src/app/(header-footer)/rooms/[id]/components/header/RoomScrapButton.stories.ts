import RoomScrapButton from '@/app/(header-footer)/rooms/[id]/components/header/RoomScrapButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/Header/RoomScrapButton',
  component: RoomScrapButton,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomScrapButton>;

export default meta;

type Story = StoryObj<typeof RoomScrapButton>;

export const Default: Story = {
  args: {
    roomId: 1,
  },
};
