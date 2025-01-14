import { Meta, StoryObj } from '@storybook/react';
import RegisterHeader from './RegisterHeader';

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
