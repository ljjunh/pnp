import RoomGalleryModalButton from '@/app/(header-footer)/rooms/[id]/components/header/RoomGalleryModalButton';
import { makeStore } from '@/lib/store';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';

const meta = {
  title: 'Rooms/header/RoomGalleryModalButton',
  component: RoomGalleryModalButton,
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
} satisfies Meta<typeof RoomGalleryModalButton>;

export default meta;

type Story = StoryObj<typeof RoomGalleryModalButton>;

export const Default: Story = {
  args: {
    images: [
      {
        id: 75,
        imageLink:
          'https://a0.muscache.com/im/pictures/miso/Hosting-764884121437376695/original/997b9211-d69f-4529-8ac1-7022eae62b0c.jpeg',
        orientation: 'LANDSCAPE',
      },
      {
        id: 76,
        imageLink:
          'https://a0.muscache.com/im/pictures/miso/Hosting-764884121437376695/original/991cf792-0881-432c-b42a-fb998340688c.jpeg',
        orientation: 'LANDSCAPE',
      },
      {
        id: 77,
        imageLink:
          'https://a0.muscache.com/im/pictures/miso/Hosting-764884121437376695/original/66edab4f-3381-418d-9f8e-e3f6657c37f6.jpeg',
        orientation: 'LANDSCAPE',
      },
      {
        id: 78,
        imageLink:
          'https://a0.muscache.com/im/pictures/miso/Hosting-764884121437376695/original/6cac87c2-5282-42ba-8da1-1df7145b3552.jpeg',
        orientation: 'LANDSCAPE',
      },
      {
        id: 79,
        imageLink:
          'https://a0.muscache.com/im/pictures/miso/Hosting-764884121437376695/original/2c613767-7c03-4533-aa42-57912d4fbe20.jpeg',
        orientation: 'LANDSCAPE',
      },
    ],
  },
};
