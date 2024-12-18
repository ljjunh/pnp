import type { Meta, StoryObj } from '@storybook/react';
import Map from '@/components/common/Map/Map';

const meta = {
  title: 'Common/Map/Map',
  component: Map,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Map>;

export default meta;

type Story = StoryObj<typeof Map>;

export const Default: Story = {
  args: {
    lat: 33.549652,
    lng: 126.652931,
  },
};
