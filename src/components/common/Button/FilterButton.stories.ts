import { Meta, StoryObj } from '@storybook/react';
import FilterButton from '@/components/common/Button/FilterButton';

const meta = {
  title: 'Common/Button/FilterButton',
  component: FilterButton,
} satisfies Meta<typeof FilterButton>;

export default meta;

type Story = StoryObj<typeof FilterButton>;

export const Default: Story = {};
