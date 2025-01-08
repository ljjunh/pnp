import Property from '@/app/(header-footer)/components/filter/Property';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Filter/Property',
  component: Property,
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
} satisfies Meta<typeof Property>;

export default meta;

type Story = StoryObj<typeof Property>;

export const Default: Story = {
  args: {
    propertyId: '0',
    params: new URLSearchParams(),
  },
};
