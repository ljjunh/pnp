// BackBtn.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BackBtn } from './BackBtn';

const meta: Meta<typeof BackBtn> = {
  title: 'Recently-viewed/BackBtn',
  component: BackBtn,
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
type Story = StoryObj<typeof BackBtn>;

// 기본 스토리
export const Default: Story = {};
