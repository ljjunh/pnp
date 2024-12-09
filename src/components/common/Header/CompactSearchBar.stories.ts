import type { Meta, StoryObj } from '@storybook/react';
import CompactSearchBar from '@/components/common/Header/CompactSearchBar';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Header/CompactSearchBar',
  // Story에서 사용할 실제 컴포넌트
  component: CompactSearchBar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CompactSearchBar>;

export default meta;

type Story = StoryObj<typeof CompactSearchBar>;

export const Default: Story = {};
