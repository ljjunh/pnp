import RoomShareUrlButton from '@/app/(header-footer)/rooms/[id]/components/header/RoomShareUrlButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/Header/RoomShareUrlButton',
  component: RoomShareUrlButton,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomShareUrlButton>;

export default meta;

type Story = StoryObj<typeof RoomShareUrlButton>;

export const Default: Story = {
  args: {},
};
