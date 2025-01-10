import { RefundDetailModalButton } from './RefundDetailModalButton';
import { makeStore } from '@/lib/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

const meta = {
  title: 'User/Reservations/RefundDetailModalButton',
  component: RefundDetailModalButton,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => {
      const store = makeStore();

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof RefundDetailModalButton>;

export default meta;

type Story = StoryObj<typeof RefundDetailModalButton>;

export const Default: Story = {
  args: {
    checkIn: '2024-01-15',
    checkOut: '2024-01-20',
  },
};