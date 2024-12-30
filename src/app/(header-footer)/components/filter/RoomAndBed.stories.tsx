import RoomAndBed from '@/app/(header-footer)/components/filter/RoomAndBed';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Filter/RoomAndBed',
  component: RoomAndBed,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RoomAndBed>;

export default meta;

type Story = StoryObj<typeof RoomAndBed>;

export const Default: Story = {
  args: {
    handleFilter: (newState: string | number | null) => {
      console.log(newState);
    },
  },
};
