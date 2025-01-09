import FilterModal from '@/app/(header-footer)/components/filter/FilterModal';
import { makeStore } from '@/lib/store';
import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

const store = makeStore();

const meta = {
  title: 'Filter/FilterModal',
  component: FilterModal,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          page: '1',
        },
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof FilterModal>;

export default meta;

type Story = StoryObj<typeof FilterModal>;

export const Default: Story = {};
