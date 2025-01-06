'use client';

import { useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { useDateSelection } from '@/hooks/useDateSelection';
import { useRoomAvailableDates } from '@/hooks/useRoomAvailableDates';
import { calculateNightCount, formatDate, isDateDisabled } from '@/utils/dateUtils';

interface RoomBookingCalendarProps {
  roomId: number;
  initialDates: string[];
  isOpen: boolean;
  onToggle: () => void;
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

export default function RoomBookingCalendar({
  roomId,
  initialDates,
  isOpen,
  onToggle,
  startDate,
  endDate,
  onDateChange,
}: RoomBookingCalendarProps) {
  const { availableDates, isLoading, onMonthChange } = useRoomAvailableDates({
    roomId,
    initialDates,
  });

  const { selectMode, setSelectMode, handleDateSelect } = useDateSelection({
    availableDates,
    onDateChange,
    startDate,
    endDate,
  });

  const dateRange: DateRange = {
    from: startDate || undefined,
    to: endDate || undefined,
  };

  const nightsCount = calculateNightCount(startDate, endDate);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onToggle();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscKey);
      return () => window.removeEventListener('keydown', handleEscKey);
    }
  }, [isOpen, onToggle]);

  return (
    <div className="col-span-2">
      <div
        className="grid grid-cols-2"
        role="group"
        aria-label="날짜 선택"
      >
        <button
          onClick={onToggle}
          className="border-b border-r border-neutral-05 px-3 py-2.5 text-left"
          aria-expanded={isOpen}
          aria-label={startDate ? `체크인 날짜: ${formatDate(startDate)}` : '체크인 날짜 선택'}
        >
          <div
            className="text-[10px]"
            aria-hidden="true"
          >
            체크인
          </div>
          <div className="text-sm">
            {startDate
              ? startDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })
              : '날짜 선택'}
          </div>
        </button>
        <button
          onClick={onToggle}
          className="relative border-b border-neutral-05 px-3 py-2.5 text-left"
          aria-expanded={isOpen}
          aria-label={endDate ? `체크아웃 날짜: ${formatDate(endDate)}` : '체크아웃 날짜 선택'}
        >
          <div
            className="text-[10px]"
            aria-hidden="true"
          >
            체크아웃
          </div>
          <div className="text-sm">
            {endDate
              ? endDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })
              : '날짜 선택'}
          </div>
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={onToggle}
            role="presentation"
          />
          <div
            className="absolute right-0 top-10 z-10 mt-2 rounded-lg border bg-white px-8 pb-4 pt-6 shadow-lg"
            role="dialog"
            aria-label="날짜 선택 달력"
          >
            <div className="flex justify-between pb-4">
              <div className="flex flex-col">
                <span
                  className="text-2xl"
                  role="status"
                >
                  {nightsCount}박
                </span>
                <span
                  className="pt-2 text-sm text-neutral-07"
                  aria-live="polite"
                >
                  {startDate && endDate
                    ? `${formatDate(startDate)}-${formatDate(endDate)}`
                    : '날짜를 선택해주세요'}
                </span>
              </div>
              <div
                className="flex justify-between"
                role="radiogroup"
                aria-label="날짜 선택 모드"
              >
                <button
                  onClick={() => setSelectMode('checkIn')}
                  className={`flex flex-col justify-center rounded-l-lg border border-neutral-05 py-2 pl-2.5 pr-10 text-left ${
                    selectMode === 'checkIn' ? 'border-2 border-shade-02' : ''
                  }`}
                  role="radio"
                  aria-checked={selectMode === 'checkIn'}
                >
                  <span
                    className="text-[10px]"
                    aria-hidden="true"
                  >
                    체크인
                  </span>
                  <span className="text-sm">
                    {startDate ? format(startDate, 'yyyy. M. d.', { locale: ko }) : '날짜 선택'}
                  </span>
                </button>
                <button
                  onClick={() => setSelectMode('checkOut')}
                  className={`flex flex-col justify-center rounded-r-lg border border-l-0 border-neutral-05 py-2 pl-2.5 pr-10 text-left ${
                    selectMode === 'checkOut' ? 'border-2 border-l-2 border-shade-02' : ''
                  }`}
                  role="radio"
                  aria-checked={selectMode === 'checkOut'}
                >
                  <span
                    className="text-[10px]"
                    aria-hidden="true"
                  >
                    체크아웃
                  </span>
                  <span className="text-sm">
                    {endDate ? format(endDate, 'yyyy. M. d.', { locale: ko }) : '날짜 선택'}
                  </span>
                </button>
              </div>
            </div>
            <div
              className="relative"
              aria-busy={isLoading}
            >
              {isLoading && (
                <div
                  className="absolute inset-0 z-50 flex items-center justify-center bg-white/50"
                  role="progressbar"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-shade-02" />
                </div>
              )}
              <Calendar
                mode="range"
                defaultMonth={startDate || new Date()}
                selected={dateRange}
                onSelect={handleDateSelect}
                onMonthChange={onMonthChange}
                numberOfMonths={2}
                locale={ko}
                disabled={(date) => isDateDisabled(date, availableDates)}
                fromMonth={new Date()}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onToggle}
                className="rounded-lg bg-shade-02 px-4 py-2 text-sm text-white hover:bg-black"
                aria-label="달력 닫기"
              >
                닫기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
