import Filter from '@/app/(header-footer)/components/Filter';
import StoreProvider from '@/app/StoreProvider';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Filter/Filter',
  component: Filter,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <StoreProvider>
        <div style={{ width: '800px' }}>
          <Story />
        </div>
      </StoreProvider>
    ),
  ],
} satisfies Meta<typeof Filter>;

export default meta;

type Story = StoryObj<typeof Filter>;

export const Default: Story = {
  args: {},
};
