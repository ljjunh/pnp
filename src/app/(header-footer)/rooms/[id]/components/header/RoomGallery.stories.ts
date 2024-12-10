import RoomGallery from '@/app/(header-footer)/rooms/[id]/components/header/RoomGallery';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/Header/RoomGallery',
  component: RoomGallery,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomGallery>;

export default meta;

type Story = StoryObj<typeof RoomGallery>;

export const Default: Story = {};
