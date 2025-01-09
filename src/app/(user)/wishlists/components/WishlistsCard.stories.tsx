// WishlistsCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { WishlistsCard } from './WishlistsCard';

const meta: Meta<typeof WishlistsCard> = {
  title: 'User/Wishlists/WishlistsCard',
  component: WishlistsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    image: '/images/05.avif',
  },
};

export default meta;
type Story = StoryObj<typeof WishlistsCard>;

// 기본 스토리
export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// 그리드 레이아웃
export const GridLayout: Story = {
  decorators: [
    (Story) => (
      <div className="w-screen">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Story args={{ image: '/images/01.avif' }} />
          <Story args={{ image: '/images/02.avif' }} />
          <Story args={{ image: '/images/03.avif' }} />
          <Story args={{ image: '/images/04.avif' }} />
        </div>
      </div>
    ),
  ],
};
