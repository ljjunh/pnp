import type { Meta, StoryObj } from '@storybook/react';
import { SocialLogin } from './SocialLogin';

const meta = {
  title: 'Login/SocialLogin',
  component: SocialLogin,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-screen-sm rounded-lg bg-white border mx-auto">
        <div className="p-6">
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SocialLogin>;

export default meta;
type Story = StoryObj<typeof SocialLogin>;

// 기본 스토리
export const Default: Story = {};
