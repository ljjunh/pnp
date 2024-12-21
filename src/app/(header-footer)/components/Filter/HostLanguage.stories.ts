import type { Meta, StoryObj } from '@storybook/react';
import HostLanguage from '@/app/(header-footer)/components/filter/HostLanguage';

const meta = {
  title: 'Filter/HostLanguage',
  component: HostLanguage,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HostLanguage>;

export default meta;

type Story = StoryObj<typeof HostLanguage>;

export const Default: Story = {};
