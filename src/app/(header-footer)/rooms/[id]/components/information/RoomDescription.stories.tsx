import RoomDescription from '@/app/(header-footer)/rooms/[id]/components/information/RoomDescription';
import { makeStore } from '@/lib/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

const meta = {
  title: 'Rooms/Information/RoomDescription',
  component: RoomDescription,
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
} satisfies Meta<typeof RoomDescription>;

export default meta;

type Story = StoryObj<typeof RoomDescription>;

export const Default: Story = {
  args: {
    location: '애월읍, 제주시',
    roomTags: [
      {
        id: 33,
        content: '최대 인원 2명',
      },
      {
        id: 34,
        content: '침실 1개',
      },
      {
        id: 37,
        content: '침대 1개',
      },
      {
        id: 39,
        content: '단독 사용 욕실 1개',
      },
    ],
    description:
      '제주에서 가장 아름다운 해안길, 애월해안도로 언덕위에 위치하여 전객실에서 애월바다가 통창으로 펼쳐지며 노을과 달이 떨어지는 모습이 더 없이 아름다운 히든힐 호텔입니다. 나를 쉬고 싶을 때 더 없이 좋은  쉼의 공간이자 편안한 힐링를 선사할 것입니다.',
    host: {
      id: 3,
      isSuperHost: true,
      isVerified: true,
      hostStartedAt: new Date('2022-12-09T23:50:36.464Z'),
      reviewsAverage: 4.788990825,
      reviewsCount: 109,
      hostTags: [
        {
          content: '응답률: 100%',
        },
        {
          content: '1시간 이내에 응답',
        },
      ],
      user: {
        id: 'aa5d73d3-7f11-42af-b3e1-478571b453c0',
        name: 'Bada',
        image: 'https://a0.muscache.com/im/pictures/user/8752a5d5-81a6-4af5-b28e-167e2ed41430.jpg',
        email: 'hwangmijeong@live.com',
      },
    },
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
    ],
    reviewsCount: 23,
    reviewsAverage: 4.67788,
  },
};
