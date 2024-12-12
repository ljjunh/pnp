import type { Meta, StoryObj } from '@storybook/react';
import { EmailLoginForm } from './EmailLoginForm';

const meta = {
  title: 'Login/EmailLoginForm',
  component: EmailLoginForm,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md mx-auto p-4 border rounded">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof EmailLoginForm>;

export default meta;
type Story = StoryObj<typeof EmailLoginForm>;

// 기본 상태
export const Default: Story = {
  parameters: {
    mockData: {
      useEmailLogin: {
        email: '',
        error: '',
        successMessage: '',
        isSubmitting: false,
      },
    },
  },
};