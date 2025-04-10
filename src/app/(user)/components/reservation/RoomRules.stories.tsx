import { makeStore } from '@/lib/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { RoomRules } from './RoomRules';

const meta = {
  title: 'User/Reservations/RoomRules',
  component: RoomRules,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      const store = makeStore();

      return (
        <Provider store={store}>
          <div className="h-full w-[480px] border bg-white p-4">
            <Story />
          </div>
        </Provider>
      );
    },
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof RoomRules>;

export default meta;
type Story = StoryObj<typeof RoomRules>;

// 기본 상태
export const Default: Story = {
  args: {
    checkInType: '셀프 체크인',
    checkIn: '15:00',
    checkOut: '11:00',
    rules: [
      {
        id: 1,
        category: '숙박 중',
        title: '게스트 정원 2명',
        icon: 'SYSTEM_FAMILY',
      },
      {
        id: 2,
        category: '숙박 중',
        title: '반려동물 동반 불가',
        icon: 'SYSTEM_PET',
      },
      {
        id: 3,
        category: '숙박 중',
        title: '실내 흡연 불가',
        icon: 'SYSTEM_SMOKING',
      },
    ],
  },
};
