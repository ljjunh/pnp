'use client';

import { useEffect, useState } from 'react';
import { addDays, differenceInDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { getRoomAvailableClient } from '@/apis/rooms/queries';

interface RoomBookingCalendarProps {
  availableDates: string[];
  isOpen: boolean;
  onToggle: () => void;
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

export default function RoomBookingCalendar({
  availableDates,
  isOpen,
  onToggle,
  startDate,
  endDate,
  onDateChange,
}: RoomBookingCalendarProps) {
  const [selectMode, setSelectMode] = useState<'checkIn' | 'checkOut'>('checkIn');

  console.log(availableDates);

  useEffect(() => {
    const fetchTemp = async () => {
      const result = await getRoomAvailableClient(9, 2024, 12);
      console.log('결과임', result);
    };
    fetchTemp();
  }, []);

  const dateRange: DateRange = {
    from: startDate,
    to: endDate,
  };

  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  const formatDate = (date: Date) => {
    return format(date, 'yyyy년 M월 d일', { locale: ko });
  };

  const handleDateSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
    selectedDay: Date,
  ) => {
    if (!selectedDay) return;

    if (selectMode === 'checkIn') {
      // 체크인 모드 : 체크인 날짜가 체크아웃 날짜보다 늦으면 체크아웃도 하루 뒤로 같이 조정
      if (selectedDay > endDate) {
        onDateChange(selectedDay, addDays(selectedDay, 1));
        setSelectMode('checkOut');
        return;
      }
      onDateChange(selectedDay, endDate);
    }
    if (selectMode === 'checkOut') {
      // 체크아웃 모드 : 체크인 날짜보다 이전 날짜 선택 시 체크인 날짜 설정
      if (selectedDay < startDate) {
        onDateChange(selectedDay, addDays(selectedDay, 1));
        return;
      }
      onDateChange(startDate, selectedDay);
    }
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
            <Calendar
              mode="range"
              defaultMonth={startDate}
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              locale={ko}
              disabled={{ before: new Date() }}
              fromMonth={new Date()}
            />
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
