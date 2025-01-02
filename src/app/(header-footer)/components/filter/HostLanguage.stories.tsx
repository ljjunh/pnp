import HostLanguage from '@/app/(header-footer)/components/filter/HostLanguage';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Filter/HostLanguage',
  component: HostLanguage,
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
} satisfies Meta<typeof HostLanguage>;

export default meta;

type Story = StoryObj<typeof HostLanguage>;

export const Default: Story = {
  args: {
    language: [1, 2, 3],
    handleFilter: (newState: number[]) => {
      console.log(newState);
    },
  },
};
