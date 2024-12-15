import RoomHost from '@/app/(header-footer)/rooms/[id]/components/information/RoomHost';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/Information/RoomHost',
  component: RoomHost,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RoomHost>;

export default meta;

type Story = StoryObj<typeof RoomHost>;

export const Default: Story = {
  args: {
    host: {
      id: 3,
      isSuperHost: true,
      isVerified: true,
      hostStartedAt: new Date('2022-12-09T23:50:36.464Z'),
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
  },
};
