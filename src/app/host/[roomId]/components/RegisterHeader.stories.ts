import RegisterHeader from '@/app/host/[roomId]/components/RegisterHeader';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Register/RegisterHeader',
  component: RegisterHeader,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof RegisterHeader>;

export default meta;

type Story = StoryObj<typeof RegisterHeader>;

export const Default: Story = {};
