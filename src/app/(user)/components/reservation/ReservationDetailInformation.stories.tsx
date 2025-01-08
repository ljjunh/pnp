import type { Meta, StoryObj } from '@storybook/react';
import { ReservationDetailInformation } from './ReservationDetailInformation';

const meta = {
  title: 'User/Reservations/ReservationDetailInfomation',
  component: ReservationDetailInformation,
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
} satisfies Meta<typeof ReservationDetailInformation>;

export default meta;
type Story = StoryObj<typeof ReservationDetailInformation>;

// 기본 상태
export const Default: Story = {};