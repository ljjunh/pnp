import type { Meta, StoryObj } from '@storybook/react';
import { HostInformation } from './HostInformation';

const meta = {
  title: 'Reservations/HostInformation',
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

export const Default: Story = {};