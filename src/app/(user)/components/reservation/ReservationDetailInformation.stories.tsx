import { makeStore } from '@/lib/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { ReservationDetailInformation } from './ReservationDetailInformation';

const meta = {
  title: 'User/Reservations/ReservationDetailInfomation',
  component: ReservationDetailInformation,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      const store = makeStore();

      return (
        <Provider store={store}>
          <div className="w-[480px] border bg-white p-4">
            <Story />
          </div>
        </Provider>
      );
    },
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof ReservationDetailInformation>;

export default meta;
type Story = StoryObj<typeof ReservationDetailInformation>;

// 기본 상태
export const Default: Story = {
  args: {
    guestNumber: 2,
    orderNumber: '123-123',
    checkIn: '1월 10일',
    checkOut: '1월 12일',
  },
};
