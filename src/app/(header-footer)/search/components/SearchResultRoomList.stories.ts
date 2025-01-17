import SearchResultRoomList from '@/app/(header-footer)/search/components/SearchResultRoomList';
import filter from '@/mocks/fixtures/filter.json';
import filterRoom from '@/mocks/fixtures/filterRoom.json';
import { FilterType } from '@/schemas/rooms';
import { Meta, StoryObj } from '@storybook/react';
import { FilterRoom } from '@/types/room';

const meta = {
  title: 'Search/SearchResultRoomList',
  component: SearchResultRoomList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchResultRoomList>;

export default meta;

type Story = StoryObj<typeof SearchResultRoomList>;

export const Default: Story = {
  args: {
    initRooms: filterRoom.data as unknown as FilterRoom[],
    filter: filter as FilterType,
    hasNext: filterRoom.page.hasNextPage,
    roomCount: 18,
  },
};
