import type { Meta, StoryObj } from '@storybook/react';
import MainLogo from '@/components/common/Header/MainLogo';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Header/MainLogo',
  // Story에서 사용할 실제 컴포넌트
  component: MainLogo,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MainLogo>;

export default meta;

type Story = StoryObj<typeof MainLogo>;

export const Default: Story = {};
