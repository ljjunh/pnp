import ReservationOption from '@/app/(header-footer)/components/filter/ReservationOption';
import { FilterType } from '@/schemas/rooms';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Filter/ReservationOption',
  component: ReservationOption,
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
} satisfies Meta<typeof ReservationOption>;

export default meta;

type Story = StoryObj<typeof ReservationOption>;

export const Default: Story = {
  args: {
    option: [],
    handleFilter: (newState: string[], type: keyof FilterType) => {
      console.log(newState, type);
    },
  },
};
