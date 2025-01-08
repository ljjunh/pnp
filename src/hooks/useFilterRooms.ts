import { useCallback, useState } from 'react';
import { FilterType } from '@/schemas/rooms';
import { FilterRoom } from '@/types/room';
import { getFilterRoom } from '@/apis/filters/queries';
import { useToast } from './use-toast';

interface UseFilterRoomsProps {
  filter: FilterType;
  initialRooms: FilterRoom[];
  hasNext: boolean;
  roomCount: number;
}

export function useFilterRooms({ filter, initialRooms, hasNext, roomCount }: UseFilterRoomsProps) {
  const [rooms, setRooms] = useState<FilterRoom[]>(initialRooms);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(hasNext);
  const { toast } = useToast();

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || isLoading) return;

    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      const response = await getFilterRoom(filter, nextPage, roomCount);

      setRooms((prev) => [...prev, ...response.data]);
      setCurrentPage(nextPage);
      setHasNextPage(response.page.hasNextPage);
    } catch (error) {
      toast({
        title: '방 목록을 불러오는 데 실패하였습니다. 잠시 후 다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasNextPage, isLoading, filter, roomCount, toast]);

  return {
    rooms,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
}
