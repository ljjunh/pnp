import { Meta, StoryObj } from '@storybook/react';
import RoomRegisterButton from './RoomRegisterButton';

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
