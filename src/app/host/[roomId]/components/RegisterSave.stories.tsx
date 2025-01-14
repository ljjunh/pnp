import { Meta, StoryObj } from '@storybook/react';
import RegisterSave from './RegisterSave';

const meta = {
  title: 'Register/RegisterSave',
  component: RegisterSave,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-fit">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RegisterSave>;

export default meta;

type Story = StoryObj<typeof RegisterSave>;

export const Default: Story = {};
