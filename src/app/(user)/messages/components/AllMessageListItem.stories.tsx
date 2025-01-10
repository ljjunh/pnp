import type { Meta, StoryObj } from '@storybook/react';
import { AllMessageListItem } from './AllMessageListItem';

const meta = {
  title: 'User/Messages/AllMessageListItem',
  component: AllMessageListItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[480px] p-4">
        <ul>
          <Story />
        </ul>
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof AllMessageListItem>;

export default meta;
type Story = StoryObj<typeof AllMessageListItem>;

const defaultArgs = {
  roomImage: '/images/05.avif',
  profileImage: '/images/05.avif',
  hostName: '호스트 이름',
  date: '2024.03.22',
  title: '에어비앤비 업데이트',
  period: '2024년 3월 22일 ~ 24일',
};

export const Default: Story = {
  args: defaultArgs,
};

export const MultipleItems: Story = {
  decorators: [
    (Story) => (
      <div className="w-[480px] p-4">
        <ul className="flex flex-col gap-2">
          <Story />
          <Story />
          <Story />
        </ul>
      </div>
    ),
  ],
  args: defaultArgs,
};