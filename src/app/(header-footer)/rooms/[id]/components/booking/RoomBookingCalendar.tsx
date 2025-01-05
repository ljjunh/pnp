'use client';

import { useState } from 'react';
import { addDays, differenceInDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { useRoomAvailableDates } from '@/hooks/useRoomAvailableDates';

interface RoomBookingCalendarProps {
  roomId: number;
  initialDates: string[];
  isOpen: boolean;
  onToggle: () => void;
  startDate: Date;
  endDate: Date;
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
  const [selectMode, setSelectMode] = useState<'checkIn' | 'checkOut'>('checkIn');

  const { availableDates, isLoading, onMonthChange } = useRoomAvailableDates({
    roomId,
    initialDates,
  });

  const dateRange: DateRange = {
    from: startDate,
    to: endDate,
  };

  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  const formatDate = (date: Date) => {
    return format(date, 'yyyy년 M월 d일', { locale: ko });
  };

  // 시작일부터 종료일까지의 모든 날짜가 예약 가능한지 확인하는 함수
  const isDateRangeAvailable = (start: Date, end: Date) => {
    // 시작일과 종료일 사이의 총 일수를 계산
    // ex) 1월1일 ~ 1월3일이면 dayCount는 3
    const dayCount = differenceInDays(end, start) + 1;

    // Array.from으로 dayCount길이의 빈 배열 생성
    return Array.from({ length: dayCount }).every((_, index) => {
      // start 날짜에 index를 더해가면서 각 날짜 생성
      // ex) start가 1월1일이고 index가 0,1,2면 1월1일, 1월2일, 1월3일
      const currentDate = addDays(start, index);
      const dateString = format(currentDate, 'yyyy.MM.dd');

      // availableDates 배열에 해당 날짜가 있는지 확인
      return availableDates.includes(dateString);
    });
  };

  const handleDateSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
    selectedDay: Date,
  ) => {
    if (!selectedDay) return;

    if (selectMode === 'checkIn') {
      // 선택한 날짜가 현재 체크아웃 날짜보다 이후인지 확인
      const isAfterCurrentEndDate = selectedDay > endDate;
      // 선택한 날짜가 체크아웃 날짜보다 이후면 체크아웃 = 선택한 날짜 + 1일
      // 그렇지 않으면 체크아웃 = 현재 체크아웃 날짜 유지
      const newEndDate = isAfterCurrentEndDate ? addDays(selectedDay, 1) : endDate;

      // 새로운 날짜 범위가 예약 가능한지 확인
      const isRangeValid = isDateRangeAvailable(selectedDay, newEndDate);

      if (isRangeValid) {
        // 예약 가능하면 날짜 업데이트
        onDateChange(selectedDay, newEndDate);
        // 선택한 날짜가 현재 체크아웃보다 이후였으면 체크아웃 선택모드로 전환
        if (isAfterCurrentEndDate) {
          setSelectMode('checkOut');
        }
      }
    }
    if (selectMode === 'checkOut') {
      // 선택한 날짜가 현재 체크인 날짜보다 이전인지 확인
      const isBeforeCurrentStartDate = selectedDay < startDate;
      // 새로운 [체크인, 체크아웃] 날짜 배열
      const [newStartDate, newEndDate] = isBeforeCurrentStartDate
        ? // 선택한 날짜가 현재 체크인보다 이전이면: [선택한 날짜, 선택한 날짜 + 1일]
          [selectedDay, addDays(selectedDay, 1)]
        : // 그렇지 않으면 [현재 체크인 날짜, 선택한 날짜]
          [startDate, selectedDay];

      // 새로운 날짜 범위가 예약 가능한지 확인
      const isRangeValid = isDateRangeAvailable(newStartDate, newEndDate);

      if (isRangeValid) {
        // 예약 가능하면 날짜 업데이트
        onDateChange(newStartDate, newEndDate);
      }
    }
  };

  // 예약 불가능한 날짜를 판별하는 함수
  const isDateDisabled = (date: Date) => {
    const dateString = format(date, 'yyyy.MM.dd');

    return !availableDates.includes(dateString);
  };

  return (
    <div className="col-span-2">
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
          className="relative border-b border-neutral-05 px-3 py-2.5 text-left"
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
        <>
          <div
            className="fixed inset-0"
            onClick={onToggle}
          />
          <div className="absolute right-0 top-10 z-10 mt-2 rounded-lg border bg-white px-8 pb-4 pt-6 shadow-lg">
            <div className="flex justify-between pb-4">
              <div className="flex flex-col">
                <span className="text-2xl">{nightsCount}박</span>
                <span className="pt-2 text-sm text-neutral-07">
                  {formatDate(startDate)} - {formatDate(endDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectMode('checkIn')}
                  className={`flex flex-col justify-center rounded-l-lg border border-neutral-05 py-2 pl-2.5 pr-10 text-left ${
                    selectMode === 'checkIn' ? 'border-2 border-shade-02' : ''
                  }`}
                >
                  <span className="text-[10px]">체크인</span>
                  <span className="text-sm">
                    {format(startDate, 'yyyy. M. d.', { locale: ko })}
                  </span>
                </button>
                <button
                  onClick={() => setSelectMode('checkOut')}
                  className={`flex flex-col justify-center rounded-r-lg border border-l-0 border-neutral-05 py-2 pl-2.5 pr-10 text-left ${
                    selectMode === 'checkOut' ? 'border-2 border-l-2 border-shade-02' : ''
                  }`}
                >
                  <span className="text-[10px]">체크아웃</span>
                  <span className="text-sm">{format(endDate, 'yyyy. M. d.', { locale: ko })}</span>
                </button>
              </div>
            </div>
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50">
                  <Loader2 className="h-6 w-6 animate-spin text-shade-02" />
                </div>
              )}
              <Calendar
                mode="range"
                defaultMonth={startDate}
                selected={dateRange}
                onSelect={handleDateSelect}
                onMonthChange={onMonthChange}
                numberOfMonths={2}
                locale={ko}
                disabled={(date) => isDateDisabled(date) || date < new Date()}
                fromMonth={new Date()}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onToggle}
                className="rounded-lg bg-shade-02 px-4 py-2 text-sm text-white hover:bg-black"
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
