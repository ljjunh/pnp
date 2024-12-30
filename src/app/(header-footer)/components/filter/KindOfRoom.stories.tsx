import KindOfRoom from '@/app/(header-footer)/components/filter/KindOfRoom';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Filter/KindOfRoom',
  component: KindOfRoom,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof KindOfRoom>;

export default meta;

type Story = StoryObj<typeof KindOfRoom>;

export const Default: Story = {
  args: {},
};
