'use client';

import { useState } from 'react';
import { POPULAR, SAFETY, SPECIAL } from '@/constants/amenity';
import AmenityItem from './components/AmenityItem';

export default function Amenities() {
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleSelect = (content: string) => {
    if (amenities.includes(content)) {
      setAmenities(amenities.filter((amenity) => amenity !== content));
    } else {
      setAmenities([...amenities, content]);
    }
  };

  return (
    <div className="px-80 py-11 pb-28">
      <p className="mb-4 text-3xl font-semibold">숙소 편의시설 정보를 추가하세요</p>
      <span className="text-lg text-neutral-07">
        여기에 추가하려는 편의시설이 보이지 않더라도 걱정하지 마세요! 숙소를 등록한 후에 편의시설을
        추가할 수 있습니다.
      </span>
      <div className="mt-8 space-y-8">
        <div className="space-y-4">
          <p className="text-xl font-semibold">다음 인기 편의시설이 있나요?</p>
          <div className="grid grid-cols-3 gap-4">
            {POPULAR.map((content, index) => (
              <AmenityItem
                key={`${content}-${index}`}
                content={content}
                isClicked={amenities.includes(content)}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xl font-semibold">특별히 내세울 만한 편의시설이 있나요?</p>
          <div className="grid grid-cols-3 gap-4">
            {SPECIAL.map((content, index) => (
              <AmenityItem
                key={`${content}-${index}`}
                content={content}
                isClicked={amenities.includes(content)}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xl font-semibold">다음과 같은 안전 관련 물품이 있나요?</p>
          <div className="grid grid-cols-3 gap-4">
            {SAFETY.map((content, index) => (
              <AmenityItem
                key={`${content}-${index}`}
                content={content}
                isClicked={amenities.includes(content)}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>
      <input
        type="hidden"
        name="step"
        value="amenities"
      />
      <input
        type="hidden"
        name="amenities"
        value={amenities}
      />
    </div>
  );
}
