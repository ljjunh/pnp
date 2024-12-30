import Amenity from '@/app/(header-footer)/components/filter/Amenity';
import { FilterType } from '@/schemas/rooms';
import type { Meta, StoryObj } from '@storybook/react';
import { ESSENTIAL_AMENITIES } from '@/constants/amenity';

const meta = {
  title: 'Filter/Amenity',
  component: Amenity,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Amenity>;

export default meta;

type Story = StoryObj<typeof Amenity>;

export const Default: Story = {
  args: {
    amenityArray: ESSENTIAL_AMENITIES,
    handleFilter: (newState: string[], type: keyof FilterType) => {
      console.log(newState, type);
    },
  },
};
