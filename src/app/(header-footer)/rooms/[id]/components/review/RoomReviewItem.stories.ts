import RoomReviewItem from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewItem';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Rooms/review/RoomReviewItem',
  component: RoomReviewItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomReviewItem>;

export default meta;

type Story = StoryObj<typeof RoomReviewItem>;

export const Default: Story = {
  args: {
    accuracy: 4.8167,
    communication: 4.8167,
    cleanliness: 4.8167,
    location: 4.8167,
    checkIn: 4.8167,
    value: 4.8167,
    content: '“달” 이라는 강아지가 너무 귀엽습니다. <br/>담에 또 올게 달 아 건강해',
    createdAt: new Date('2024-11-24T05:28:59.000Z'),
    user: {
      id: '0f6f5982-fd57-49ac-a472-933808a48297',
      image:
        'https://a0.muscache.com/im/pictures/user/User/original/904cfa12-d9b0-418b-9e38-eb51bc97c2b1.jpeg',
      name: '진섭',
      host: {
        hostStartedAt: new Date('2024-12-10T02:12:51.458Z'),
        isSuperHost: false,
      },
    },
  },
};
