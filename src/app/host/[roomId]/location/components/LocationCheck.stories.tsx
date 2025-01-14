import { Meta, StoryObj } from '@storybook/react';
import LocationCheck from './LocationCheck';

const meta = {
  title: 'Register/Location/LocationCheck',
  component: LocationCheck,
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
} satisfies Meta<typeof LocationCheck>;

export default meta;

type Story = StoryObj<typeof LocationCheck>;

export const Default: Story = {
  args: {
    latitude: 37.5665,
    longitude: 126.978,
    locationDetail: {
      country: '한국',
      state: '',
      city: '',
      district: '',
      roadAddress: '',
      buildingName: '',
      postalCode: '',
    },
  },
};
