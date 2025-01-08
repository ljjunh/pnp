import type { Meta, StoryObj } from '@storybook/react';
import { RoomRules } from './RoomRules';

const meta = {
  title: 'Reservations/RoomRules',
  component: RoomRules,
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
} satisfies Meta<typeof RoomRules>;

export default meta;
type Story = StoryObj<typeof RoomRules>;

// 기본 상태
export const Default: Story = {};