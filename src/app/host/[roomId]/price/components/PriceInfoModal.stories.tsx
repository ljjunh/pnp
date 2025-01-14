import StoreProvider from '@/app/StoreProvider';
import { Meta, StoryObj } from '@storybook/react';
import PriceInfoModal from './PriceInfoModal';

const meta = {
  title: 'Register/Price/PriceInfoModal',
  component: PriceInfoModal,
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
} satisfies Meta<typeof PriceInfoModal>;

export default meta;

type Story = StoryObj<typeof PriceInfoModal>;

export const Default: Story = {};
