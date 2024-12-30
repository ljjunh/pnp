import Tag from '@/app/(header-footer)/components/filter/Tag';
import { Meta, StoryObj } from '@storybook/react';
import {
  CHARACTERISTIC_AMENITIES,
  ESSENTIAL_AMENITIES,
  LOCATION_AMENITIES,
  SAFETY_AMENITIES,
} from '@/constants/amenity';

const meta = {
  title: 'Filter/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof Tag>;

// 선택되지 않은 태그
export const NonChecked: Story = {
  args: {
    tag: 'SYSTEM_WI_FI',
    isChecked: false,
    handleClick: () => {},
  },
};

// 선택된 태그
export const Checked: Story = {
  args: {
    tag: 'SYSTEM_WI_FI',
    isChecked: true,
    handleClick: () => {},
  },
};

// 필수 태그
export const Essential: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {ESSENTIAL_AMENITIES.map((amenity, index) => (
        <Tag
          key={`${amenity}-${index}`}
          tag={amenity}
          isChecked={false}
          handleClick={() => {}}
        />
      ))}
    </div>
  ),
};

// 특징 태그
export const Characteristic: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {CHARACTERISTIC_AMENITIES.map((amenity, index) => (
        <Tag
          key={`${amenity}-${index}`}
          tag={amenity}
          isChecked={false}
          handleClick={() => {}}
        />
      ))}
    </div>
  ),
};

// 위치 태그
export const Location: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {LOCATION_AMENITIES.map((amenity, index) => (
        <Tag
          key={`${amenity}-${index}`}
          tag={amenity}
          isChecked={false}
          handleClick={() => {}}
        />
      ))}
    </div>
  ),
};

// 안전 태그
export const Safety: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {SAFETY_AMENITIES.map((amenity, index) => (
        <Tag
          key={`${amenity}-${index}`}
          tag={amenity}
          isChecked={false}
          handleClick={() => {}}
        />
      ))}
    </div>
  ),
};
