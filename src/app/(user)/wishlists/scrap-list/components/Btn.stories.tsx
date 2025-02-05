import type { Meta, StoryObj } from '@storybook/react';
import { Btn } from './Btn';

const meta = {
  title: 'User/WishlistDetail/Btn',
  component: Btn,
  parameters: {
    layout: 'centered',
  },
  args: {
    text: '날짜 입력하기',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Btn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const GuestButton: Story = {
  args: {
    text: '게스트 1명',
  },
};

export const ShareButton: Story = {
  args: {
    text: '공유하기',
  },
};
