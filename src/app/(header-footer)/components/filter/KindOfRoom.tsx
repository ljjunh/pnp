import { cn } from '@/lib/utils';
import { FilterType } from '@/schemas/rooms';

interface KindOfRoomProps {
  roomType?: 'Entire' | 'Private' | null;
  handleFilter: (newState: 'Entire' | 'Private' | null, type: keyof FilterType) => void;
}

export default function KindOfRoom({ roomType, handleFilter }: KindOfRoomProps) {
  const hoverStyle = 'hover:rounded-lg hover:border-none hover:bg-neutral-01';
  const selectStyle = 'rounded-lg border-2 border-black bg-neutral-01';

  return (
    <div className="px-6 py-8">
      <div className="pb-4">
        <span className="text-lg font-semibold">숙소 유형</span>
      </div>
      <div className="h-12 w-full">
        <div className="grid h-full grid-cols-3 rounded-xl border border-neutral-03 p-1">
          <div
            className={cn(
              'flex cursor-pointer items-center justify-center border-r border-neutral-03',
              roomType === null && selectStyle,
              hoverStyle,
            )}
            onClick={() => {
              handleFilter(null, 'roomType');
            }}
          >
            <span className="text-sm">모든 유형</span>
          </div>
          <div
            className={cn(
              'flex cursor-pointer items-center justify-center border-r border-neutral-03',
              roomType === 'Private' && selectStyle,
              hoverStyle,
            )}
            onClick={() => {
              handleFilter('Private', 'roomType');
            }}
          >
            <span className="text-sm">방</span>
          </div>
          <div
            className={cn(
              'flex cursor-pointer items-center justify-center',
              roomType === 'Entire' && selectStyle,
              hoverStyle,
            )}
            onClick={() => {
              handleFilter('Entire', 'roomType');
            }}
          >
            <span className="text-sm">집 전체</span>
          </div>
        </div>
      </div>
    </div>
  );
}
