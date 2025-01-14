import StoreProvider from '@/app/StoreProvider';
import { Meta, StoryObj } from '@storybook/react';
import PriceModalCloseButton from './PriceModalCloseButton';

const meta = {
  title: 'Register/Price/PriceModalCloseButton',
  component: PriceModalCloseButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    ),
  ],
} satisfies Meta<typeof PriceModalCloseButton>;

export default meta;

type Story = StoryObj<typeof PriceModalCloseButton>;

export const Default: Story = {};
