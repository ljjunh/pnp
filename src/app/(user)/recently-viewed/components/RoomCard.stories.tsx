import type { Meta, StoryObj } from '@storybook/react';
import { RoomCard } from './RoomCard';

const meta: Meta<typeof RoomCard> = {
  title: 'User/Recently-viewed/RoomCard',
  component: RoomCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // Next.js Image 컴포넌트를 위한 설정
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RoomCard>;

// 기본 보기 모드 스토리
export const View: Story = {
  args: {
    isEdit: false,
    recentView:{
      id:1,
      title:'어서오세요',
      description:'description',
      location: '광주',
      price: 10000,
      thumbnail: '/images/05.avif',
      images:[],
      scraped:false
    }
  },
};

// 편집 모드 스토리
export const Edit: Story = {
  args: {
    isEdit: true,
    recentView:{
      id:1,
      title:'어서오세요',
      description:'description',
      location: '광주',
      price: 10000,
      thumbnail: '/images/05.avif',
      images:[],
      scraped:false
    }
  },
};