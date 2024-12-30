import RoomReviewItem from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewItem';
import type { Meta, StoryObj } from '@storybook/react';
import { withSession } from '../../../../../../../.storybook/decorators';

const meta = {
  title: 'Rooms/review/RoomReviewItem',
  component: RoomReviewItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [withSession], // 데코레이터 추가
} satisfies Meta<typeof RoomReviewItem>;

export default meta;

type Story = StoryObj<typeof RoomReviewItem>;

export const Default: Story = {
  args: {
    roomId: 1,
    reviewId: 10033,
    accuracy: 5,
    communication: 3,
    cleanliness: 5,
    location: 3,
    checkIn: 5,
    value: 4,
    content: '스토리북',
    createdAt: new Date('2024-12-30T05:52:26.870Z'),
    user: {
      id: 'cm59s1q8w00001fbn54uf8evo',
      image:
        'https://lh3.googleusercontent.com/a/ACg8ocL9vSroEP_NxjgPkSkPGppBrXOabIMXjX41dRAr7TyiQBOAXjI=s96-c',
      name: '임준희',
      host: {
        hostStartedAt: new Date('2024-12-29T15:40:27.316Z'),
        isSuperHost: false,
      },
    },
    isInterceptedRoute: true,
  },
};
