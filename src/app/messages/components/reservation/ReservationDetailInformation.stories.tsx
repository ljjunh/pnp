import type { Meta, StoryObj } from '@storybook/react';
import { ReservationDetailInfomation } from './ReservationDetailInformation';

const meta = {
  title: 'MESSAGES/ReservationDetailInfomation',
  component: ReservationDetailInfomation,
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
} satisfies Meta<typeof ReservationDetailInfomation>;

export default meta;
type Story = StoryObj<typeof ReservationDetailInfomation>;

// 기본 상태
export const Default: Story = {};