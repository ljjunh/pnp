import RoomCancellationModalButton from '@/app/(header-footer)/rooms/[id]/components/information/RoomCancellationModalButton';
import { makeStore } from '@/lib/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

const meta = {
  title: 'Rooms/Information/RoomCancellationModalButton',
  component: RoomCancellationModalButton,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => {
      const store = makeStore();

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof RoomCancellationModalButton>;

export default meta;

type Story = StoryObj<typeof RoomCancellationModalButton>;

export const Default: Story = {};
