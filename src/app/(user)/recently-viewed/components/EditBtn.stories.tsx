import type { Meta, StoryObj } from '@storybook/react';
import { EditBtn } from './EditBtn';

const meta: Meta<typeof EditBtn> = {
  title: 'Recently-viewed/EditBtn',
  component: EditBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  decorators: [
    (Story) => (
      <div className='w-32'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EditBtn>;

// 기본 스토리
export const Default: Story = {};
