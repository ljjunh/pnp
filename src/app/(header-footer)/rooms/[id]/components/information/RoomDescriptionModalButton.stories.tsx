import RoomDescriptionModalButton from '@/app/(header-footer)/rooms/[id]/components/information/RoomDescriptionModalButton';
import { makeStore } from '@/lib/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

const meta = {
  title: 'Rooms/Information/RoomDescriptionModalButton',
  component: RoomDescriptionModalButton,
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
} satisfies Meta<typeof RoomDescriptionModalButton>;

export default meta;

type Story = StoryObj<typeof RoomDescriptionModalButton>;

export const Default: Story = {
  args: {
    description:
      '제주에서 가장 아름다운 해안길, 애월해안도로 언덕위에 위치하여 전객실에서 애월바다가 통창으로 펼쳐지며 노을과 달이 떨어지는 모습이 더 없이 아름다운 히든힐 호텔입니다. 나를 쉬고 싶을 때 더 없이 좋은  쉼의 공간이자 편안한 힐링를 선사할 것입니다.',
  },
};
