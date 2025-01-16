import LocationConfirm from '@/app/host/[roomId]/location/components/LocationConfirm';
import { Meta, StoryObj } from '@storybook/react';

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
      state: '서울특별시',
      city: '중구',
      district: '태평로1가',
      roadAddress: '태평로 1',
      buildingName: '서울시청',
      postalCode: '04524',
    },
    setLocationDetail: () => {},
  },
};
