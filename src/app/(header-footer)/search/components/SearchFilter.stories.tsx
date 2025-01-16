import SearchFilter from '@/app/(header-footer)/search/components/SearchFilter';
import StoreProvider from '@/app/StoreProvider';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Search/SearchFilter',
  component: SearchFilter,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <StoreProvider>
        <div style={{ width: '400px' }}>
          <Story />
        </div>
      </StoreProvider>
    ),
  ],
} satisfies Meta<typeof SearchFilter>;

export default meta;

type Story = StoryObj<typeof SearchFilter>;

export const Default: Story = {};
