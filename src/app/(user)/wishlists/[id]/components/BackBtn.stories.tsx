import type { Meta, StoryObj } from '@storybook/react';
import { BackBtn } from './BackBtn';

const meta = {
  title: 'WishlistDetail/BackBtn',
  component: BackBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BackBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

