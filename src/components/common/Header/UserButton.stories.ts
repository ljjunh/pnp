import type { Meta, StoryObj } from '@storybook/react';
import UserButton from '@/components/common/Header/UserButton';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Header/UserButton',
  // Story에서 사용할 실제 컴포넌트
  component: UserButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserButton>;

export default meta;

type Story = StoryObj<typeof UserButton>;

export const Default: Story = {};
