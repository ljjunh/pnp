import { Meta, StoryObj } from '@storybook/react';
import LocationConfirm from './LocationConfirm';

const meta = {
  title: 'Register/Location/LocationConfirm',
  component: LocationConfirm,
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
} satisfies Meta<typeof LocationConfirm>;

export default meta;

type Story = StoryObj<typeof LocationConfirm>;

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
    setLocationDetail: () => {},
  },
};
