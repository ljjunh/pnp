import type { Meta, StoryObj } from '@storybook/react';
import KindOfRoom from '@/app/(header-footer)/components/filter/KindOfRoom';

const meta = {
  title: 'Filter/KindOfRoom',
  component: KindOfRoom,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof KindOfRoom>;

export default meta;

type Story = StoryObj<typeof KindOfRoom>;

export const Default: Story = {};
