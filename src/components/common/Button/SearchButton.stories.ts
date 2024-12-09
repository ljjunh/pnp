import type { Meta, StoryObj } from '@storybook/react';
import SearchButton from '@/components/common/Button/SearchButton';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Button/SearchButton',
  // Story에서 사용할 실제 컴포넌트
  component: SearchButton,
} satisfies Meta<typeof SearchButton>;

export default meta;

type Story = StoryObj<typeof SearchButton>;

export const Default: Story = {};
