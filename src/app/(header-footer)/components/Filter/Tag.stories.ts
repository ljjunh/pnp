import Tag from '@/app/(header-footer)/components/Filter/Tag';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Filter/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof Tag>;

// TODO: 전체 태그 스토리북

export const Default: Story = {
  args: {
    tag: 'wifi',
  },
};
