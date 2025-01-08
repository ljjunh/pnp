import type { Meta, StoryObj } from '@storybook/react';
import { TripRoomInformation } from './TripRoomInformation';

const meta = {
  title: 'User/Reservations/TripRoomInformation',
  component: TripRoomInformation,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex w-[480px] flex-col gap-3 border bg-white px-2">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    hostName: '김호스트',
    checkIn: '2025년 01월 09일 (목)',
    checkInTime: '오후 4:00',
    checkOut: '2025년 01월 09일 (금)',
    checkOutTime: '오전 11:00',
    title: '서울 강남구의 아늑한 스튜디오',
    images: [
      {
        id: 1,
        imageLink: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
        orientation: 'LANDSCAPE',
      },
      {
        id: 2,
        imageLink: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        orientation: 'LANDSCAPE',
      },
      {
        id: 3,
        imageLink: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
        orientation: 'LANDSCAPE',
      },
    ],
    roomId: 12345,
  },
} satisfies Meta<typeof TripRoomInformation>;

export default meta;
type Story = StoryObj<typeof TripRoomInformation>;

// 기본 상태 - 모든 정보가 있는 경우
export const Default: Story = {};
