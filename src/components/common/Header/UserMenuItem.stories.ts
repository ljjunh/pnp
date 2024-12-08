import type { Meta, StoryObj } from '@storybook/react';
import UserMenuItem from '@/components/common/Header/UserMenuItem';

const meta = {
  // Storybook 사이드바에서 보여질 경로와 이름
  title: 'Common/Header/UserMenuItem',
  // Story에서 사용할 실제 컴포넌트
  component: UserMenuItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    id: {
      control: 'text',
      description: '메뉴 아이템의 고유 식별자',
    },
    label: {
      control: 'text',
      description: '메뉴에 표시될 텍스트',
    },
    href: {
      control: 'text',
      description: '링크 주소 (없으면 버튼으로 동작)',
    },
    hasDivider: {
      control: 'boolean',
      description: '하단 구분선 표시 여부',
    },
  },
} satisfies Meta<typeof UserMenuItem>;

export default meta;

type Story = StoryObj<typeof UserMenuItem>;

// 기본 링크 메뉴 아이템
export const Link: Story = {
  args: {
    id: 'messages',
    label: '메시지',
    href: '/messages',
    hasDivider: false,
  },
};

// 구분선이 있는 링크 메뉴 아이템
export const LinkWithDivider: Story = {
  args: {
    id: 'wishlist',
    label: '위시리스트',
    href: '/wishlist',
    hasDivider: true,
  },
};

// 버튼 메뉴 아이템 (로그인)
export const Button: Story = {
  args: {
    id: 'login',
    label: '로그인',
    hasDivider: false,
  },
};

// 구분선이 있는 버튼 메뉴 아이템 (회원가입)
export const ButtonWithDivider: Story = {
  args: {
    id: 'signup',
    label: '회원가입',
    hasDivider: true,
  },
};
