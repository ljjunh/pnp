import { Meta, StoryObj } from '@storybook/react';
import SearchDate from '@/components/common/Header/SearchDate';

const meta = {
  title: 'Common/Header/SearchDate',
  component: SearchDate,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    section: {
      control: {
        type: 'select',
        options: ['checkIn', 'checkOut'],
      },
    },
  },
} satisfies Meta<typeof SearchDate>;

export default meta;

type Story = StoryObj<typeof SearchDate>;

export const Default: Story = {
  args: {
    section: null,
    setSection: () => {},
    checkIn: undefined,
    checkOut: undefined,
    handleSearchFilter: () => {},
  },
};
