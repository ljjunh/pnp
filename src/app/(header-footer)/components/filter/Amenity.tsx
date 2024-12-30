import { useState } from 'react';
import Tag from '@/app/(header-footer)/components/filter/Tag';
import { FilterType } from '@/schemas/rooms';
import {
  CHARACTERISTIC_AMENITIES,
  ESSENTIAL_AMENITIES,
  LOCATION_AMENITIES,
  SAFETY_AMENITIES,
} from '@/constants/amenity';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface AmenityProps {
  amenityArray: string[];
  handleFilter: (newState: string[], type: keyof FilterType) => void;
}

export default function Amenity({ amenityArray, handleFilter }: AmenityProps) {
  const [more, setMore] = useState<boolean>(false);

  const handleAmenity = (amenity: string) => {
    const newAmenities = amenityArray.includes(amenity)
      ? amenityArray.filter((prevAmenity) => prevAmenity !== amenity)
      : [...amenityArray, amenity];

    handleFilter(newAmenities, 'amenityArray');
  };

  return (
    <div className="px-6 py-8">
      <div className="pb-4">
        <span className="text-lg font-semibold">편의시설</span>
      </div>
      {more ? (
        <div className="space-y-10">
          <div>
            <p className="mb-5">필수</p>
            <div className="flex flex-wrap gap-3">
              {ESSENTIAL_AMENITIES.map((amenity, index) => (
                <Tag
                  tag={amenity}
                  key={`${amenity}-${index}`}
                  handleClick={handleAmenity}
                  isChecked={amenityArray.includes(amenity)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5">특징</p>
            <div className="flex flex-wrap gap-3">
              {CHARACTERISTIC_AMENITIES.map((amenity, index) => (
                <Tag
                  tag={amenity}
                  key={`${amenity}-${index}`}
                  handleClick={handleAmenity}
                  isChecked={amenityArray.includes(amenity)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5">위치</p>
            <div className="flex flex-wrap gap-3">
              {LOCATION_AMENITIES.map((amenity, index) => (
                <Tag
                  tag={amenity}
                  key={`${amenity}-${index}`}
                  handleClick={handleAmenity}
                  isChecked={amenityArray.includes(amenity)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5">안전</p>
            <div className="flex flex-wrap gap-3">
              {SAFETY_AMENITIES.map((amenity, index) => (
                <Tag
                  tag={amenity}
                  key={`${amenity}-${index}`}
                  handleClick={handleAmenity}
                  isChecked={amenityArray.includes(amenity)}
                />
              ))}
            </div>
          </div>
          <div
            className="flex cursor-pointer items-center space-x-1"
            onClick={() => setMore(false)}
          >
            <span className="border-b-2 border-black">접기</span>
            <IoIosArrowUp size={20} />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            {ESSENTIAL_AMENITIES.slice(0, 6).map((amenity, index) => (
              <Tag
                tag={amenity}
                key={`${amenity}-${index}`}
                handleClick={handleAmenity}
                isChecked={amenityArray.includes(amenity)}
              />
            ))}
          </div>
          <div
            className="flex cursor-pointer items-center space-x-1"
            onClick={() => setMore(true)}
          >
            <span className="border-b-2 border-black">더 표시</span>
            <IoIosArrowDown size={20} />
          </div>
        </div>
      )}
    </div>
  );
}
