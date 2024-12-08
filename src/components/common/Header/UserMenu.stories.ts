import type { Meta, StoryObj } from '@storybook/react';
import UserMenu from '@/components/common/Header/UserMenu';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Header/UserMenu',
  // Story에서 사용할 실제 컴포넌트
  component: UserMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof UserMenu>;

export default meta;

type Story = StoryObj<typeof UserMenu>;

export const Default: Story = {};
