import type { Meta, StoryObj } from '@storybook/react';
import { WishlistCard } from './WishlistCard';

const meta = {
  title: 'WishlistDetail/WishlistCard',
  component: WishlistCard,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="w-screen mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof WishlistCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
