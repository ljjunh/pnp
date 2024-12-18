import type { Meta, StoryObj } from '@storybook/react';
import GoogleMapView from '@/components/common/Map/GoogleMapView';

const meta = {
  title: 'Common/Map/GoogleMapView',
  component: GoogleMapView,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof GoogleMapView>;

export default meta;

type Story = StoryObj<typeof GoogleMapView>;

export const Default: Story = {
  args: {
    lat: 33.549652,
    lng: 126.652931,
  },
};
