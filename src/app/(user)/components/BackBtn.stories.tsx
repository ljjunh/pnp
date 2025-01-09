import type { Meta, StoryObj } from '@storybook/react';
import { BackBtn } from './BackBtn';

const meta: Meta<typeof BackBtn> = {
  title: 'User/BackBtn',
  component: BackBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex w-32">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    url: {
      control: 'text',
      description: '이동할 페이지의 URL',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BackBtn>;

// 기본 스토리
export const Default: Story = {
  args: {
    url: '/',
  },
};
