import { useState } from 'react';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { isDateRangeAvailable } from '@/utils/dateUtils';

interface UseDateSelectionProps {
  availableDates: string[];
  onDateChange: (startDate: Date, endDate: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
}

export const useDateSelection = ({
  availableDates,
  onDateChange,
  startDate,
  endDate,
}: UseDateSelectionProps) => {
  const [selectMode, setSelectMode] = useState<'checkIn' | 'checkOut'>('checkIn');

  const handleDateSelect = (range: DateRange | undefined, selectedDay: Date) => {
    if (!selectedDay) return;

    if (selectMode === 'checkIn') {
      // 선택한 날짜가 현재 체크아웃 날짜보다 이후인지 확인
      const isAfterCurrentEndDate = endDate ? selectedDay > endDate : true;

      // 선택한 날짜가 체크아웃 날짜보다 이후면 체크아웃 = 선택한 날짜 + 1일
      // 그렇지 않으면 체크아웃 = 현재 체크아웃 날짜 유지
      const newEndDate = endDate
        ? isAfterCurrentEndDate
          ? addDays(selectedDay, 1)
          : endDate
        : addDays(selectedDay, 1);

      // 새로운 날짜 범위가 예약 가능한지 확인
      if (isDateRangeAvailable(selectedDay, newEndDate, availableDates)) {
        onDateChange(selectedDay, newEndDate);
        if (isAfterCurrentEndDate) {
          setSelectMode('checkOut');
        }
      }
    }
    if (selectMode === 'checkOut') {
      // 선택한 날짜가 현재 체크인 날짜보다 이전인지 확인
      const isBeforeCurrentStartDate = startDate ? selectedDay < startDate : true;
      // 새로운 [체크인, 체크아웃] 날짜 배열
      const [newStartDate, newEndDate] = isBeforeCurrentStartDate
        ? [selectedDay, addDays(selectedDay, 1)]
        : [startDate as Date, selectedDay]; // startDate가 반드시 있다는 걸 알 수 있는 상황

      // 새로운 날짜 범위가 예약 가능한지 확인
      if (isDateRangeAvailable(newStartDate, newEndDate, availableDates)) {
        onDateChange(newStartDate, newEndDate);
      }
    }
  };

  return {
    selectMode,
    setSelectMode,
    handleDateSelect,
  };
};
