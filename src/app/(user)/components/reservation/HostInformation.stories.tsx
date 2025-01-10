import type { Meta, StoryObj } from '@storybook/react';
import { HostInformation } from './HostInformation';

const meta = {
  title: 'User/Reservations/HostInformation',
  component: HostInformation,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[480px] border bg-white p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof HostInformation>;

export default meta;
type Story = StoryObj<typeof HostInformation>;

export const Default: Story = {
  args: {
    hostName: '도영',
    hostImage: 'https://a0.muscache.com/im/pictures/user/00eb8ef3-5385-46c8-9687-3b1186c98bb9.jpg',
    isSuperHost: true,
  },
};
