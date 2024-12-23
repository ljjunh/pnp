import type { Meta, StoryObj } from '@storybook/react';
import { LoginHeader } from './LoginHeader';

const meta = {
  title: 'Login/LoginHeader',
  component: LoginHeader,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-screen-sm rounded-lg bg-white border mx-auto">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof LoginHeader>;

export default meta;
type Story = StoryObj<typeof LoginHeader>;

// 기본
export const Default: Story = {
  args: {},
};

// 모달, 뒤로가기 버튼 렌더링
export const WithBackButton: Story = {
  args: {
    onBack: () => alert('Back button clicked'),
  },
};
