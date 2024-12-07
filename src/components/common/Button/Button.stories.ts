import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/common/Button';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Button',
  // Story에서 사용할 실제 컴포넌트
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

// 기본 버튼들
export const Default: Story = {
  args: {
    children: 'Button',
  },
};
