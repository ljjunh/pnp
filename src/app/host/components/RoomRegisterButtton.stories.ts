import RoomRegisterButton from '@/app/host/components/RoomRegisterButton';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Register/RoomRegisterButton',
  component: RoomRegisterButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RoomRegisterButton>;

export default meta;

type Story = StoryObj<typeof RoomRegisterButton>;

export const Default: Story = {};
