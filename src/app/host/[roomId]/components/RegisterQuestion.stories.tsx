import { Meta, StoryObj } from '@storybook/react';
import RegisterQuestion from './RegisterQuestion';

const meta = {
  title: 'Register/RegisterQuestion',
  component: RegisterQuestion,
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
} satisfies Meta<typeof RegisterQuestion>;

export default meta;

type Story = StoryObj<typeof RegisterQuestion>;

export const Default: Story = {};
