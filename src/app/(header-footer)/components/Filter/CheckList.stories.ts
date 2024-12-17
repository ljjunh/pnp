import type { Meta, StoryObj } from '@storybook/react';
import CheckList from './CheckList';

const meta = {
  title: 'Filter/CheckList',
  component: CheckList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CheckList>;

export default meta;

type Story = StoryObj<typeof CheckList>;

export const Default: Story = {
  args: {
    title: '게스트 출입구에 계단이나 문턱 없음',
  },
};
