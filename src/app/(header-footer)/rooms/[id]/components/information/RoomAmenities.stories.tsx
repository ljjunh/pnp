import RoomAmenities from '@/app/(header-footer)/rooms/[id]/components/information/RoomAmenities';
import { makeStore } from '@/lib/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

const meta = {
  title: 'Rooms/Information/RoomAmenities',
  component: RoomAmenities,
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
} satisfies Meta<typeof RoomAmenities>;

export default meta;

type Story = StoryObj<typeof RoomAmenities>;

export const Default: Story = {
  args: {
    amenities: [
      {
        id: 1,
        category: '욕실',
        title: '헤어드라이어',
        subTitle: null,
        icon: 'SYSTEM_HAIRDRYER',
        available: true,
      },
      {
        id: 4,
        category: '욕실',
        title: '온수',
        subTitle: null,
        icon: 'SYSTEM_HOT_WATER',
        available: true,
      },
      {
        id: 6,
        category: '엔터테인먼트',
        title: 'TV',
        subTitle: null,
        icon: 'SYSTEM_TV',
        available: true,
      },
      {
        id: 7,
        category: '냉난방',
        title: '에어컨',
        subTitle: null,
        icon: 'SYSTEM_SNOWFLAKE',
        available: true,
      },
      {
        id: 14,
        category: '인터넷 및 업무 공간',
        title: '와이파이',
        subTitle: null,
        icon: 'SYSTEM_WI_FI',
        available: true,
      },
      {
        id: 20,
        category: '위치 특성',
        title: '해변으로 연결 - 해변 바로 앞',
        subTitle: null,
        icon: 'SYSTEM_BEACH',
        available: true,
      },
      {
        id: 23,
        category: '주차장 및 기타 시설',
        title: '건물 내 무료 주차',
        subTitle: null,
        icon: 'SYSTEM_MAPS_CAR_RENTAL',
        available: true,
      },
      {
        id: 25,
        category: '숙소에 없는 시설',
        title: '주방',
        subTitle: null,
        icon: 'SYSTEM_NO_KITCHEN',
        available: false,
      },
      {
        id: 26,
        category: '숙소에 없는 시설',
        title: '세탁기',
        subTitle: null,
        icon: 'SYSTEM_NO_WASHER',
        available: false,
      },
      {
        id: 27,
        category: '숙소에 없는 시설',
        title: '건조기',
        subTitle: null,
        icon: 'SYSTEM_NO_DRYER',
        available: false,
      },
    ],
  },
};
