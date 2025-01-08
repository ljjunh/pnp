import RoomBox from '@/app/(header-footer)/components/RoomBox';
import filter from '@/mocks/fixtures/filter.json';
import filterRoom from '@/mocks/fixtures/filterRoom.json';
import { FilterType } from '@/schemas/rooms';
import { Meta, StoryObj } from '@storybook/react';
import { FilterRoomResponse } from '@/types/room';

const meta = {
  title: 'Main/RoomBox',
  component: RoomBox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomBox>;

export default meta;

type Story = StoryObj<typeof RoomBox>;

export const Default: Story = {
  args: {
    filter: filter as FilterType,
    filterRoom: filterRoom as unknown as FilterRoomResponse,
  },
};
