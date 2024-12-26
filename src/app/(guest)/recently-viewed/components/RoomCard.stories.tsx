import type { Meta, StoryObj } from '@storybook/react';
import { RoomCard } from './RoomCard';

const meta: Meta<typeof RoomCard> = {
  title: 'Recently-viewed/RoomCard',
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
  },
};

// 편집 모드 스토리
export const Edit: Story = {
  args: {
    isEdit: true,
  },
};