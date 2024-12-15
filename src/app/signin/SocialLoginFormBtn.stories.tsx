import type { Meta, StoryObj } from '@storybook/react';
import { SocialLoginFormBtn } from '@/app/signin/SocialLoginFormBtn';

const meta = {
  title: 'Login/SocialLoginFormBtn',
  component: SocialLoginFormBtn,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SocialLoginFormBtn>;

export default meta;
type Story = StoryObj<typeof SocialLoginFormBtn>;

export const Google: Story = {
  args: {
    text: '구글로 로그인하기',
  },
};

export const Kakao: Story = {
  args: {
    text: '카카오로 로그인하기',
  },
};
