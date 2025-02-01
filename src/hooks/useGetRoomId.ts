'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomError } from '@/errors';
import { createRoomId } from '@/apis/register/action';
import { getProgressRoomId } from '@/apis/register/queries';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routeURL';

export default function useGetRoomId() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleError = (status: number, message?: string) => {
    switch (status) {
      case 401:
        router.push(ROUTES.LOGIN);
        break;
      case 429:
        toast({
          title: '숙소 등록 횟수 제한',
          description: message,
          variant: 'destructive',
        });
        break;

      // 500 에러(서버 에러, 네트워크 에러)
      default:
        toast({
          title: '숙소 등록에 실패했습니다.',
          description: message,
          variant: 'destructive',
        });
    }
  };

  const getRoomId = async () => {
    setIsLoading(true);
    try {
      const progressRoomId = await getProgressRoomId();

      // roomId가 0이 아니면 redirect
      if (progressRoomId !== 0) {
        router.push(ROUTES.REGISTER_STEP(String(progressRoomId)).START);
        return;
      }

      // roomId가 0이면 새로운 roomId 생성 요청
      const response = await createRoomId();

      if (!response.success) {
        handleError(response.status, response.message);
        return;
      }

      // 데이터가 없는 경우 실패로 간주
      if (!response.data) {
        toast({
          title: '숙소 등록에 실패했습니다.',
          description: '숙소 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          variant: 'destructive',
        });

        return;
      }

      // 성공했을 때 숙소 등록 첫 단계로 이동
      router.push(ROUTES.REGISTER_STEP(String(response.data)).START);
    } catch (error) {
      if (error instanceof CustomError) {
        handleError(error.statusCode, error.message);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { getRoomId, isLoading };
}
