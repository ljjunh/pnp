'use client';

import { useRouter } from 'next/navigation';
import { createRoomId } from '@/apis/register/action';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routeURL';

export default function useGetRoomId() {
  const { toast } = useToast();
  const router = useRouter();

  const handleClick = async () => {
    const response = await createRoomId();

    if (!response.success) {
      switch (response.status) {
        case 401:
          router.push(ROUTES.LOGIN);

          return;
        case 429:
          toast({
            title: '숙소 등록 횟수 제한',
            description: response.message,
            variant: 'destructive',
          });

          return;
        // 500 에러(서버 에러, 네트워크 에러)
        default:
          toast({
            title: '숙소 등록에 실패했습니다.',
            description: response.message,
            variant: 'destructive',
          });

          return;
      }
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
    router.push(ROUTES.REGISTER_STEP(String(response.data.roomId)).START);
  };

  return { handleClick };
}
