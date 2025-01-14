import { Meta, StoryObj } from '@storybook/react';
import RegisterFooter from './RegisterFooter';

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
