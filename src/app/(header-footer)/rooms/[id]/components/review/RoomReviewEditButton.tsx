'use client';

import { useRouter } from 'next/navigation';
import { RatingValues } from '@/types/review';
import { updateReview } from '@/apis/reviews/actions';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routeURL';

interface RoomReviewEditButtonProps {
  roomId: number;
  reviewId: number;
  editingContent: string;
  onClose: () => void;
  editRatings: RatingValues;
}

export default function RoomReviewEditButton({
  roomId,
  reviewId,
  editingContent,
  onClose,
  editRatings,
}: RoomReviewEditButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!editingContent.trim()) return;

    const response = await updateReview(roomId, reviewId, {
      content: editingContent.trim(),
      ...editRatings,
    });

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
      return;
    }
    toast({
      title: '리뷰가 수정되었습니다.',
    });

    onClose();
  };

  return (
    <button
      onClick={handleSubmit}
      className="rounded-lg bg-black px-3 py-1 text-white hover:bg-black/90"
    >
      수정
    </button>
  );
}
