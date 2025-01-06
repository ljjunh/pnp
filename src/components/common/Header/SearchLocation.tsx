import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Section } from './ExpandedSearchBar';

const locations = [
  '서울',
  '부산',
  '제주도',
  '속초',
  '강릉',
  '전주',
  '대구',
  '경주',
  '여수',
  '서귀포',
  '대전',
  '인천',
];

interface SearchLocationProps {
  section: string | null;
  setSection: (section: Section | null) => void;
}

export default function SearchLocation({ section, setSection }: SearchLocationProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSection('checkIn');
    }
  };

  return (
    <Popover open={section === 'location'}>
      <PopoverTrigger
        onClick={() => setSection('location')}
        className={cn(
          'flex flex-1 flex-col items-start rounded-full py-3.5 pl-8 transition-all duration-300',
          section ? 'hover:bg-neutral-04' : 'hover:bg-neutral-02',
        )}
      >
        <span className="text-sm">여행지</span>
        <input
          type="text"
          onChange={handleLocationChange}
          onKeyDown={handleKeyDown}
          placeholder={selectedLocation || '여행지 검색'}
          className="text-md w-full bg-transparent text-neutral-07 outline-none placeholder:text-neutral-07"
          readOnly={section !== 'location'}
        />
      </PopoverTrigger>
      <PopoverContent
        className="mt-2 w-[500px] rounded-3xl p-10"
        align="start"
      >
        <div className="flex flex-col">
          <span className="mb-5 font-bold">한국</span>
          <div className="flex flex-wrap gap-2">
            {locations.map((location, index) => (
              <div
                className={cn(
                  'w-24 cursor-pointer rounded-full border border-neutral-05 hover:border-black',
                  selectedLocation === location && 'border-2 border-black bg-neutral-02',
                )}
                key={`${location}-${index}`}
                onClick={() => {
                  setSelectedLocation(location);
                  setSection('checkIn');
                }}
              >
                <p className="py-2.5 text-center">{location}</p>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
