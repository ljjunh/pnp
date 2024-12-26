import type { Meta, StoryObj } from '@storybook/react';
import ReservationOption from '@/app/(header-footer)/components/filter/ReservationOption';

const meta = {
  title: 'Filter/ReservationOption',
  component: ReservationOption,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ReservationOption>;

export default meta;

type Story = StoryObj<typeof ReservationOption>;

export const Default: Story = {};
