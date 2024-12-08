import type { Meta, StoryObj } from '@storybook/react';
import UserNav from '@/components/common/Header/UserNav';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Header/UserNav',
  // Story에서 사용할 실제 컴포넌트
  component: UserNav,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof UserNav>;

export default meta;

type Story = StoryObj<typeof UserNav>;

export const Default: Story = {};
