import CheckList from '@/app/(header-footer)/components/filter/CheckList';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Filter/CheckList',
  component: CheckList,
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
} satisfies Meta<typeof CheckList>;

export default meta;

type Story = StoryObj<typeof CheckList>;

export const Default: Story = {
  args: {
    id: 1,
    title: '한국어',
    handleClick: () => {},
  },
};
