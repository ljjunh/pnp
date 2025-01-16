import RegisterFooter from '@/app/host/[roomId]/components/RegisterFooter';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Register/RegisterFooter',
  component: RegisterFooter,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RegisterFooter>;

export default meta;

type Story = StoryObj<typeof RegisterFooter>;

export const Default: Story = {};
