import StoreProvider from '@/app/StoreProvider';
import { Meta, StoryObj } from '@storybook/react';
import PriceInput from './PriceInput';

const meta = {
  title: 'Register/Price/PriceInput',
  component: PriceInput,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <StoreProvider>
        <div className="w-[800px]">
          <Story />
        </div>
      </StoreProvider>
    ),
  ],
} satisfies Meta<typeof PriceInput>;

export default meta;

type Story = StoryObj<typeof PriceInput>;

export const Default: Story = {};
