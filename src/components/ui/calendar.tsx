'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        // 각 월 컨테이너 내부의 요소들 사이 거리
        month: 'space-y-4',

        // 월/년도 표시되는 헤더 부분 스타일
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'font-medium',

        // 이전/다음 달 이동 버튼 영역
        nav: 'space-x-1 flex items-center',
        nav_button: 'h-7 w-7 bg-transparent p-0 text-black hover:opacity-100',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',

        // 달력 테이블 자체 스타일
        table: 'w-full border-collapse space-y-1',
        // 요일 표시 행
        head_row: 'flex',
        head_cell: 'text-neutral-07 rounded-md w-10 font-medium text-[0.8rem]',

        // 날짜들 있는 행
        row: 'flex w-full mt-2',

        // 각 날짜 셀
        cell: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100',

        // 개별 날짜 스타일
        day: 'h-10 w-10 p-0 rounded-full font-normal hover:border hover:border-black',

        // 선택된 범위 중간에 있는 날짜들
        day_range_middle: 'bg-neutral-100 aria-selected:text-black',

        // 선택된 날짜
        day_selected: 'bg-black text-white hover:border hover:border-black',

        // 선택 불가능한 날짜
        day_disabled: 'text-neutral-03 line-through decoration-neutral-03 hover:border-0',

        // 현재 월에 속하지 않는 날짜들(이전/다음 달의 날짜)

        day_outside: 'opacity-50',
        ...classNames,
      }}
      components={{
        IconLeft: (props: React.ComponentProps<typeof ChevronLeft>) => (
          <ChevronLeft
            className="h-4 w-4"
            {...props}
          />
        ),
        IconRight: (props: React.ComponentProps<typeof ChevronRight>) => (
          <ChevronRight
            className="h-4 w-4"
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
