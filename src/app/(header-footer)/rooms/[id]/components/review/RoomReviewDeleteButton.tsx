'use client';

import { useRouter } from 'next/navigation';
import { deleteReview } from '@/apis/reviews/actions';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routeURL';

interface RoomReviewDeleteButtonProps {
  roomId: number;
  reviewId: number;
}

export default function RoomReviewDeleteButton({ roomId, reviewId }: RoomReviewDeleteButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDeleteReview = async () => {
    const response = await deleteReview(roomId, reviewId);
    if (!response.success) {
      switch (response.status) {
        case 401:
          router.push(ROUTES.LOGIN);
          break;
        default:
          toast({
            title: response.message,
            variant: 'destructive',
          });
      }
    }
    toast({
      title: '리뷰가 삭제되었습니다.',
    });
  };

  return (
    <button
      onClick={handleDeleteReview}
      className="hover:text-black"
    >
      삭제
    </button>
  );
}
