'use client';

import { ko } from 'date-fns/locale';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface RoomBookingCalendarProps {
  isOpen: boolean;
  onToggle: () => void;
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

export default function RoomBookingCalendar({
  isOpen,
  onToggle,
  startDate,
  endDate,
  onDateChange,
}: RoomBookingCalendarProps) {
  const handleSelect = (ranges: RangeKeyDict) => {
    if (ranges.selection?.startDate && ranges.selection?.endDate) {
      onDateChange(ranges.selection.startDate, ranges.selection.endDate);
    }
  };

  return (
    <div className="relative col-span-2">
      <div className="grid grid-cols-2">
        <button
          onClick={onToggle}
          className="border-b border-r border-neutral-05 px-3 py-2.5 text-left"
        >
          <div className="text-[10px]">체크인</div>
          <div className="text-sm">
            {startDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </div>
        </button>
        <button
          onClick={onToggle}
          className="border-b border-neutral-05 px-3 py-2.5 text-left"
        >
          <div className="text-[10px]">체크아웃</div>
          <div className="text-sm">
            {endDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-lg border bg-white shadow-lg">
          <DateRange
            ranges={[
              {
                startDate,
                endDate,
                key: 'selection',
              },
            ]}
            onChange={handleSelect}
            months={2}
            direction="horizontal"
            locale={ko}
            minDate={new Date()}
            rangeColors={['#FF385C']}
            monthDisplayFormat="yyyy년 MMM"
            dateDisplayFormat="yyyy년 M월 d일"
          />
          <div className="flex justify-end p-4">
            <button
              type="button"
              className="rounded-lg p-2.5 text-right underline hover:bg-neutral-01"
              onClick={onToggle}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
