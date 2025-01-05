import { useMemo, useState } from 'react';
import { getRoomAvailableClient } from '@/apis/rooms/queries';

interface UseRoomAvailableDatesProps {
  roomId: number;
  initialDates: string[];
}

export function useRoomAvailableDates({ roomId, initialDates }: UseRoomAvailableDatesProps) {
  // 예약 가능한 날짜
  const [availableDates, setAvailableDates] = useState<string[]>(initialDates);
  const [isLoading, setIsLoading] = useState(false);

  // 캐시 저장소
  const [cache] = useState(new Map<string, string[]>());

  const { currentMonth, currentYear } = useMemo(() => {
    const today = new Date();

    return {
      currentMonth: today.getMonth() + 1,
      currentYear: today.getFullYear(),
    };
  }, []);

  // 월 변경
  const handleMonthChange = async (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // 현재 날짜와 일치하는 달의 경우 새로운 패칭을 하지 않고 ssr로 받은 초기 데이터 사용
    if (year === currentYear && month === currentMonth) {
      setAvailableDates(initialDates);
      return;
    }

    // 이미 캐시된 데이터가 있는지 확인
    const cacheKey = `${year}-${month}`;
    if (cache.has(cacheKey)) {
      setAvailableDates(cache.get(cacheKey) || []);
      return;
    }

    // 새로운 데이터 패치
    setIsLoading(true);
    try {
      const newDates = await getRoomAvailableClient(roomId, year, month);
      cache.set(cacheKey, newDates);
      setAvailableDates(newDates);
    } catch {
      setAvailableDates([]); // 빈 배열로 설정하여 모든 날짜를 선택 불가능하게 함
    } finally {
      setIsLoading(false);
    }
  };

  return {
    availableDates,
    isLoading,
    onMonthChange: handleMonthChange,
  };
}
