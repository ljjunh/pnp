import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { SearchType } from '@/schemas/rooms';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { Section } from '@/components/common/Header/ExpandedSearchBar';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SearchDateProps {
  section: string | null;
  setSection: (section: Section | null) => void;
  checkIn: string | undefined;
  checkOut: string | undefined;
  handleSearchFilter: (newState: string, type: keyof SearchType) => void;
}

export default function SearchDate({
  section,
  setSection,
  checkIn,
  checkOut,
  handleSearchFilter,
}: SearchDateProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectMode, setSelectMode] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [plusDays, setPlusDays] = useState<string>('정확한 날짜');
  const [dates, setDates] = useState<{
    checkIn: Date | null;
    checkOut: Date | null;
  }>({
    checkIn: checkIn ? new Date(checkIn) : null,
    checkOut: checkOut ? new Date(checkOut) : null,
  });

  // Location에서 checkIn으로 진입할 때 처리
  useEffect(() => {
    if (section === 'checkIn') {
      setIsOpen(true);
      setSelectMode('checkIn');
    }
  }, [section]);

  const onSectionChange = (nowSection: Section) => {
    if (nowSection === 'checkIn' || nowSection === 'checkOut') {
      if (section === nowSection) {
        setIsOpen(false);
        setSection(null);
      } else {
        setIsOpen(true);
        setSection(nowSection);
      }
    } else {
      setSection(nowSection);
    }
  };

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    setDates({
      checkIn: startDate,
      checkOut: endDate,
    });

    if (startDate) {
      handleSearchFilter(format(startDate, 'yyyy-MM-dd'), 'checkIn');
    }

    if (endDate) {
      handleSearchFilter(format(endDate, 'yyyy-MM-dd'), 'checkOut');
    }
  };

  const handleDateSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
    selectedDay: Date,
  ) => {
    if (!selectedDay) return;

    if (selectMode === 'checkIn') {
      // 체크인 선택 했는데, 체크아웃 날짜가 없으면 체크인 날짜만 설정
      if (!dates.checkOut) {
        handleDateChange(selectedDay, null);
        setSelectMode('checkOut');
        setSection('checkOut');
        return;
      }

      // 체크인 모드 : 체크인 날짜가 체크아웃 날짜보다 늦으면 체크아웃도 하루 뒤로 같이 조정
      if (selectedDay > dates.checkOut) {
        handleDateChange(selectedDay, addDays(selectedDay, 1));
        setSelectMode('checkOut');
        return;
      }
      handleDateChange(selectedDay, dates.checkOut);
    }

    if (!dates.checkIn) return;

    if (selectMode === 'checkOut') {
      // 체크아웃 모드 : 체크인 날짜보다 이전 날짜 선택 시 체크인 날짜 설정
      if (selectedDay < dates.checkIn) {
        handleDateChange(selectedDay, addDays(selectedDay, 1));
        return;
      }
      handleDateChange(dates.checkIn, selectedDay);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '날짜 추가';
    return format(date, 'yyyy-MM-dd');
  };

  return (
    <Popover
      open={isOpen && (section === 'checkIn' || section === 'checkOut')}
      onOpenChange={(open) => {
        if (!open) {
          setSection(null);
        }
      }}
    >
      <PopoverTrigger asChild>
        <div className="flex flex-[1.4]">
          {/* 체크인 */}
          <div
            onClick={() => onSectionChange('checkIn')}
            className={cn(
              'flex-[0.7] rounded-full py-3.5 pl-6 transition-all duration-300',
              section === 'checkIn' ? 'flex-[0.7] rounded-full bg-shade-01 hover:bg-shade-01' : '',
              section ? 'hover:bg-neutral-04' : 'hover:bg-neutral-02',
            )}
          >
            <div className="text-sm">체크인</div>
            <div className="text-md flex space-x-1 text-neutral-07">
              <p>{formatDate(dates.checkIn)}</p>
              <p>{plusDays !== '정확한 날짜' && plusDays}</p>
            </div>
          </div>

          <div className="h-10 w-[1px] self-center bg-neutral-04" />

          {/* 체크아웃 */}
          <div
            onClick={() => onSectionChange('checkOut')}
            className={cn(
              'flex-[0.7] rounded-full py-3.5 pl-6 transition-all duration-300',
              section === 'checkOut' ? 'flex-[0.7] rounded-full bg-shade-01 hover:bg-shade-01' : '',
              section ? 'hover:bg-neutral-04' : 'hover:bg-neutral-02',
            )}
          >
            <div className="text-sm">체크아웃</div>
            <div className="text-md flex space-x-1 text-neutral-07">
              <p>{formatDate(dates.checkOut)}</p>
              <p>{plusDays !== '정확한 날짜' && plusDays}</p>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="mt-2 w-fit rounded-3xl p-10">
        <Calendar
          mode="range"
          defaultMonth={new Date()}
          selected={{
            from: dates.checkIn || undefined,
            to: dates.checkOut || undefined,
          }}
          onSelect={handleDateSelect}
          numberOfMonths={2}
          locale={ko}
          disabled={{ before: new Date() }}
          fromMonth={new Date()}
        />
        <div className="flex gap-2 py-3">
          {['정확한 날짜', '± 1일', '± 2일', '± 3일', '± 7일', '± 14일'].map((day, index) => (
            <div
              className={cn(
                'cursor-pointer rounded-full border border-neutral-05 px-4 py-2.5 hover:border-2 hover:border-black hover:bg-neutral-01',
                plusDays === day ? 'border-2 border-black bg-neutral-01' : '',
              )}
              key={`${day}-${index}`}
              onClick={() => setPlusDays(day)}
            >
              <p className="text-center text-sm">{day}</p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
