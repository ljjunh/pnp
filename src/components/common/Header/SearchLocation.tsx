import { ChangeEvent, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { SearchType } from '@/schemas/rooms';
import { Section } from '@/components/common/Header/ExpandedSearchBar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const locations = [
  '서울',
  '인천',
  '대전',
  '대구',
  '광주',
  '부산',
  '울산',
  '세종',
  '여수',
  '속초',
  '강릉',
  '전주',
];

interface SearchLocationProps {
  section: string | null;
  location?: string;
  handleSearchFilter: (newState: string, type: keyof SearchType) => void;
  setSection: (section: Section | null) => void;
}

export default function SearchLocation({
  section,
  setSection,
  location,
  handleSearchFilter,
}: SearchLocationProps) {
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchFilter(e.target.value, 'location');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSection('checkIn');
    }
  };

  return (
    <Popover
      open={section === 'location'}
      onOpenChange={(open) => {
        if (!open) {
          setSection(null);
        }
      }}
    >
      <PopoverTrigger
        onClick={() => {
          setSection(section === 'location' ? null : 'location');
        }}
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
          placeholder={location || '여행지 검색'}
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
            {locations.map((item, index) => (
              <div
                className={cn(
                  'w-24 cursor-pointer rounded-full border border-neutral-05 hover:border-black',
                  location === item && 'border-2 border-black bg-neutral-02',
                )}
                key={`${item}-${index}`}
                onClick={() => {
                  handleSearchFilter(item, 'location');
                  setSection('checkIn');
                }}
              >
                <p className="py-2.5 text-center">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
