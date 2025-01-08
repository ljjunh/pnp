import filter from '@/mocks/fixtures/filter.json';
import filterRoom from '@/mocks/fixtures/filterRoom.json';
import { FilterType } from '@/schemas/rooms';
import { Meta, StoryObj } from '@storybook/react';
import { FilterRoomResponse } from '@/types/room';
import SearchResultBox from './SearchResultBox';

const meta = {
  title: 'Search/SearchResultBox',
  component: SearchResultBox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchResultBox>;

export default meta;

type Story = StoryObj<typeof SearchResultBox>;

export const Default: Story = {
  args: {
    filter: filter as FilterType,
    filterRoom: filterRoom as unknown as FilterRoomResponse,
  },
};
