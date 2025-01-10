// RecentlyViewedCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { RecentlyViewedCard } from './RecentlyViewedCard';

const meta: Meta<typeof RecentlyViewedCard> = {
  title: 'User/Wishlists/RecentlyViewedCard',
  component: RecentlyViewedCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RecentlyViewedCard>;

// 기본 스토리
export const Default: Story = {};
