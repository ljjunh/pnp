import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createScrap } from '@/apis/rooms/actions';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routeURL';

export function useRoomScrap(roomId: number, initialIsScrap: boolean) {
  const { toast } = useToast();
  const router = useRouter();
  const [isScrap, setIsScrap] = useState(initialIsScrap);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateScrap = async () => {
    setIsLoading(true);
    // Optimistic Update
    setIsScrap(true);

    const response = await createScrap(roomId);

    if (!response.success) {
      // 실패시 원래상태로 콜백
      setIsScrap(false);
      if (response.status === 401) {
        router.push(ROUTES.LOGIN);
        setIsLoading(false);
        return;
      }
      toast({
        title: response.message,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: '스크랩이 완료되었습니다.',
    });
    setIsLoading(false);
  };

  return {
    isScrap,
    isLoading,
    handleCreateScrap,
  };
}
