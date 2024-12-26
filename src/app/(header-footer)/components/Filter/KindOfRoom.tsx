import { cn } from '@/lib/utils';
import { FilterType } from '@/schemas/rooms';

interface KindOfRoomProps {
  roomType: 'Entire' | 'Private' | null;
  handleFilter: (newState: 'Entire' | 'Private' | null, type: keyof FilterType) => void;
}

export default function KindOfRoom({ roomType, handleFilter }: KindOfRoomProps) {
  const handleRoomTypeChange = (type: string) => {
    let newRoomType: 'Entire' | 'Private' | null = null;

    switch (type) {
      case '방':
        newRoomType = 'Private';
        break;
      case '집 전체':
        newRoomType = 'Entire';
        break;
      case '모든 유형':
        newRoomType = null;
        break;
    }

    handleFilter(newRoomType, 'roomType');
  };

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
              hoverStyle,
              roomType === null && selectStyle,
            )}
            onClick={() => {
              handleRoomTypeChange('모든 유형');
            }}
          >
            <span className="text-sm">모든 유형</span>
          </div>
          <div
            className={cn(
              'flex cursor-pointer items-center justify-center border-r border-neutral-03',
              hoverStyle,
              roomType === 'Private' && selectStyle,
            )}
            onClick={() => {
              handleRoomTypeChange('방');
            }}
          >
            <span className="text-sm">방</span>
          </div>
          <div
            className={cn(
              'flex cursor-pointer items-center justify-center',
              hoverStyle,
              roomType === 'Entire' && selectStyle,
            )}
            onClick={() => {
              handleRoomTypeChange('집 전체');
            }}
          >
            <span className="text-sm">집 전체</span>
          </div>
        </div>
      </div>
    </div>
  );
}
