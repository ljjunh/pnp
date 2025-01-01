import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createScrap, deleteScrap } from '@/apis/rooms/actions';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routeURL';

interface RoomScrapProps {
  roomId: number;
  initialIsScrap: boolean;
}

/**
 * 숙소 스크랩 기능을 제공하는 커스텀 훅
 * - 낙관적 업데이트 지원
 * - 세션 체크 및 로그인 페이지 리다이렉션
 * - 로딩 상태 관리
 * - 토스트 메시지 처리
 *
 * @param {Object} params - 훅 파라미터
 * @param {number} params.roomId - 스크랩할 숙소 ID
 * @param {boolean} params.initialIsScrap - 초기 스크랩 상태
 *
 * @returns {boolean} returns.isScrap - 현재 스크랩 상태
 * @returns {boolean} returns.isLoading - 요청 처리 중 여부
 * @returns {() => Promise<void>} returns.handleCreateScrap - 스크랩 생성 핸들러
 * @returns {() => Promise<void>} returns.handleDeleteScrap - 스크랩 삭제 핸들러
 */
export function useRoomScrap({ roomId, initialIsScrap }: RoomScrapProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isScrap, setIsScrap] = useState(initialIsScrap);
  const [isLoading, setIsLoading] = useState(false);

  const checkSession = () => {
    if (!session) {
      router.push(ROUTES.LOGIN);
      return false;
    }
    return true;
  };

  const handleCreateScrap = async () => {
    if (!checkSession()) return;

    setIsLoading(true);
    // Optimistic Update
    setIsScrap(true);

    const response = await createScrap(roomId);

    if (!response.success) {
      // 실패시 원래 상태로 콜백
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

  const handleDeleteScrap = async () => {
    if (!checkSession()) return;

    setIsLoading(true);
    // Optimistic Update
    setIsScrap(false);

    const response = await deleteScrap(roomId);

    if (!response.success) {
      // 실패시 원래 상태로 콜백
      setIsScrap(true);
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
      title: '스크랩이 취소되었습니다.',
    });
    setIsLoading(false);
  };

  return {
    isScrap,
    isLoading,
    handleCreateScrap,
    handleDeleteScrap,
  };
}
