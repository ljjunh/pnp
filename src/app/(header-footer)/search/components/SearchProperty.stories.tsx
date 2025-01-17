import SearchProperty from '@/app/(header-footer)/search/components/SearchProperty';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Search/SearchProperty',
  component: SearchProperty,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '1000px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchProperty>;

export default meta;

type Story = StoryObj<typeof SearchProperty>;

export const Default: Story = {};
