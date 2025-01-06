import { Meta, StoryObj } from '@storybook/react';
import SearchLocation from '@/components/common/Header/SearchLocation';

const meta = {
  title: 'Common/Header/SearchLocation',
  component: SearchLocation,
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
        options: ['location'],
      },
    },
  },
} satisfies Meta<typeof SearchLocation>;

export default meta;

type Story = StoryObj<typeof SearchLocation>;

export const Default: Story = {
  args: {
    section: null,
    setSection: () => {},
    location: undefined,
    handleSearchFilter: () => {},
  },
};
