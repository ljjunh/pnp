import { Meta, StoryObj } from '@storybook/react';
import AmenityItem from './AmenityItem';

const meta = {
  title: 'Register/Amenities/AmenityItem',
  component: AmenityItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-40">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AmenityItem>;

export default meta;

type Story = StoryObj<typeof AmenityItem>;

export const Default: Story = {
  args: {
    content: 'SYSTEM_WI_FI',
    isClicked: false,
    handleSelect: () => {},
  },
};
