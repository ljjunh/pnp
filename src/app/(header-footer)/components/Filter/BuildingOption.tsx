import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Tag from './Tag';

const buildingOption = ['apartment', 'guestHouse', 'hotel'];

export default function BuildingOption() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="px-6 py-8">
      <div
        className="flex cursor-pointer items-center justify-between pb-4"
        onClick={() => setOpen(!open)}
        data-testid="building-option"
        role="button"
        aria-expended={open}
        aria-controls="building-option"
        tabIndex={0}
      >
        <span className="text-lg font-semibold">건물 유형</span>
        {open ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
      </div>
      {open && (
        <div
          className="flex flex-wrap gap-3"
          id="building-option-content"
          data-testid="building-option-content"
        >
          {buildingOption.map((option, index) => (
            <Tag
              tag={option}
              key={`${option}-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
