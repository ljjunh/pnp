import LocationInput from '@/app/host/[roomId]/location/components/LocationInput';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Register/Location/LocationInput',
  component: LocationInput,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LocationInput>;

export default meta;

type Story = StoryObj<typeof LocationInput>;

export const Default: Story = {
  args: {
    searchLocation: '',
    setLatitude: () => {},
    setLongitude: () => {},
    setSearchLocation: () => {},
    setLocationDetail: () => {},
  },
};
