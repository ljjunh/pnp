import type { Meta, StoryObj } from '@storybook/react';
import ExpandedSearchBar from '@/components/common/Header/ExpandedSearchBar';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Header/ExpandedSearchBar',
  // Story에서 사용할 실제 컴포넌트
  component: ExpandedSearchBar,
  parameters: {
    layout: 'centered',
  },
  // 기본 props 값 설정
  args: {
    activeSection: null,
  },
  // Controls 탭에서 조작할 수 있도록 설정
  argTypes: {
    activeSection: {
      control: 'select',
      options: [null, 'location', 'checkIn', 'checkOut', 'guests'],
      description: '현재 활성화된 섹션',
    },
  },
} satisfies Meta<typeof ExpandedSearchBar>;

export default meta;

type Story = StoryObj<typeof ExpandedSearchBar>;

export const Default: Story = {};
