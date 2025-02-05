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
    thumbnail: '/images/05.avif',
    scrapListLength: 5,
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