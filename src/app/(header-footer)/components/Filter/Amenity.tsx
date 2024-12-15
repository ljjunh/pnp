import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Tag from './Tag';

const essentialAmenities = [
  'wifi',
  'kitchen',
  'washingMachine',
  'dryingMachine',
  'airConditioner',
  'heating',
  'library',
  'tv',
  'hairDryer',
  'iron',
];

const characteristicAmenities = [
  'swimmingPool',
  'bath',
  'parking',
  'eletronic',
  'babyBed',
  'kingSizeBed',
  'fitness',
  'barbecue',
  'breakfast',
  'fireplace',
  'smoking',
];

const locationAmenities = ['beach', 'nearWater'];

const safetyAmenities = ['fireAlarm', 'carbonMonoxideDetector'];

export default function Amenity() {
  const [more, setMore] = useState<boolean>(false);
  
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
              {essentialAmenities.map((amenity, index) => (
                <Tag
                  tag={amenity}
                  key={`${amenity}-${index}`}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5">특징</p>
            <div className="flex flex-wrap gap-3">
              {characteristicAmenities.map((amenity, index) => (
                <Tag
                  tag={amenity}
                  key={`${amenity}-${index}`}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5">위치</p>
            <div className="flex flex-wrap gap-3">
              {locationAmenities.map((amenity, index) => (
                <Tag
                  tag={amenity}
                  key={`${amenity}-${index}`}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5">안전</p>
            <div className="flex flex-wrap gap-3">
              {safetyAmenities.map((amenity, index) => (
                <Tag
                  tag={amenity}
                  key={`${amenity}-${index}`}
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
            {essentialAmenities.slice(0, 6).map((amenity, index) => (
              <Tag
                tag={amenity}
                key={`${amenity}-${index}`}
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
