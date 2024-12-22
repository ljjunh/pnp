import RoomSafetyModalButton from '@/app/(header-footer)/rooms/[id]/components/information/RoomSafetyModalButton';
import { makeStore } from '@/lib/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

const meta = {
  title: 'Rooms/Information/RoomSafetyModalButton',
  component: RoomSafetyModalButton,
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
} satisfies Meta<typeof RoomSafetyModalButton>;

export default meta;

type Story = StoryObj<typeof RoomSafetyModalButton>;

export const Default: Story = {
  args: {
    safetyAmenities: [
      {
        id: 38,
        category: '숙소 안전',
        title: '화재경보기',
        subTitle: null,
        icon: 'SYSTEM_DETECTOR_SMOKE',
        available: true,
      },
      {
        id: 39,
        category: '숙소 안전',
        title: '일산화탄소 경보기',
        subTitle: null,
        icon: 'SYSTEM_DETECTOR_CO',
        available: true,
      },
      {
        id: 40,
        category: '숙소 안전',
        title: '소화기',
        subTitle: null,
        icon: 'SYSTEM_FIRE_EXTINGUISHER',
        available: true,
      },
      {
        id: 41,
        category: '숙소 안전',
        title: '구급 상자',
        subTitle: null,
        icon: 'SYSTEM_FIRST_AID_KIT',
        available: true,
      },
    ],
  },
};
