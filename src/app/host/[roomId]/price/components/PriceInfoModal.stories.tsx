import StoreProvider from '@/app/StoreProvider';
import PriceInfoModal from '@/app/host/[roomId]/price/components/PriceInfoModal';
import { Meta, StoryObj } from '@storybook/react';

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
