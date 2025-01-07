import { Meta, StoryObj } from '@storybook/react';
import SearchGuest from '@/components/common/Header/SearchGuest';

const meta = {
  title: 'Common/Header/SearchGuest',
  component: SearchGuest,
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
  argTypes: {
    section: {
      control: {
        type: 'select',
        options: ['guest'],
      },
    },
  },
} satisfies Meta<typeof SearchGuest>;

export default meta;

type Story = StoryObj<typeof SearchGuest>;

export const Default: Story = {
  args: {
    section: null,
    setSection: () => {},
    filter: {},
    handleSearchFilter: () => {},
  },
};
