import type { Meta, StoryObj } from '@storybook/react';
import { SettingBtn } from './SettingBtn';

const meta = {
  title: 'User/WishlistDetail/SettingBtn',
  component: SettingBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SettingBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
