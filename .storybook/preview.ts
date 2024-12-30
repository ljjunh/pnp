import type { Preview } from '@storybook/react';
import '../src/app/globals.css';
import { withSession } from './decorators';

export const decorators = [withSession];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        push: () => {},
        back: () => {},
      },
    },
  },
};

export default preview;
