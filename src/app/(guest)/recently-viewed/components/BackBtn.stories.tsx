// BackBtn.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BackBtn } from './BackBtn';

const meta: Meta<typeof BackBtn> = {
  title: 'Components/BackBtn',
  component: BackBtn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // NextJS Link 컴포넌트를 위한 decorator 설정
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BackBtn>;

// 기본 스토리
export const Default: Story = {};

// 호버 상태를 보여주는 스토리
export const Hover: Story = {
  parameters: {
    pseudo: { hover: true },
  },
};
