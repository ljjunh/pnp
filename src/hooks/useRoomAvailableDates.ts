import { useState } from 'react';
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

  // 월 변경
  const handleMonthChange = async (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // 이미 캐시된 데이터가 있는지 확인
    const cacheKey = `${year}-${month}`;
    if (cache.has(cacheKey)) {
      setAvailableDates(cache.get(cacheKey) || []);
      return;
    }

    // 새로운 데이터 패치
    setIsLoading(true);
    // try-catch가 필요하려나
    try {
      const newDates = await getRoomAvailableClient(roomId, year, month);
      cache.set(cacheKey, newDates);
      setAvailableDates(newDates);
    } catch (error) {
      console.error('새로운 날짜 패칭 실패', error);
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
