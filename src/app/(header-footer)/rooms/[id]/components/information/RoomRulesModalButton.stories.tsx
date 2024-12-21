import RoomRulesModalButton from '@/app/(header-footer)/rooms/[id]/components/information/RoomRulesModalButton';
import { makeStore } from '@/lib/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

const meta = {
  title: 'Rooms/Information/RoomRulesModalButton',
  component: RoomRulesModalButton,
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
} satisfies Meta<typeof RoomRulesModalButton>;

export default meta;

type Story = StoryObj<typeof RoomRulesModalButton>;

export const Default: Story = {
  args: {
    checkIn: '15:00',
    checkOut: '11:00',
    checkInType: '셀프 체크인',
    rules: [
      {
        id: 1,
        category: '숙박 중',
        title: '게스트 정원 2명',
        icon: 'SYSTEM_FAMILY',
      },
    ],
  },
};
