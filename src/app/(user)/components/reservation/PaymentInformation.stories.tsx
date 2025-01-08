import type { Meta, StoryObj } from '@storybook/react';
import { PaymentInformation } from './PaymentInformation';

const meta = {
  title: 'Reservations/PaymentInformation',
  component: PaymentInformation,
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
} satisfies Meta<typeof PaymentInformation>;

export default meta;
type Story = StoryObj<typeof PaymentInformation>;

// 기본 상태
export const Default: Story = {};