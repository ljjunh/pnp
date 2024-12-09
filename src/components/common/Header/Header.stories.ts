import type { Meta, StoryObj } from '@storybook/react';
import Header from '@/components/common/Header/Header';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Header/Header',
  // Story에서 사용할 실제 컴포넌트
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
