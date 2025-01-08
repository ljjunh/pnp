import SearchResultLocation from '@/app/(header-footer)/search/components/SearchResultLocation';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Search/SearchResultLocation',
  component: SearchResultLocation,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchResultLocation>;

export default meta;

type Story = StoryObj<typeof SearchResultLocation>;

export const Default: Story = {};
