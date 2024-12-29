'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import RoomReviewRating from '@/app/(header-footer)/rooms/[id]/components/review/RoomReviewRating';
import Button from '@/components/common/Button/Button';
import { createReview } from '@/apis/reviews/actions';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routeURL';

interface RatingValues {
  accuracy: number;
  cleanliness: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
}

interface ReviewFormState {
  content: string;
  ratings: RatingValues;
  isLoading: boolean;
  showRatingsSection: boolean;
}

const DEFAULT_RATINGS: RatingValues = {
  accuracy: 5,
  cleanliness: 5,
  checkIn: 5,
  communication: 5,
  location: 5,
  value: 5,
};

const INITIAL_FORM_STATE: ReviewFormState = {
  content: '',
  ratings: DEFAULT_RATINGS,
  isLoading: false,
  showRatingsSection: false,
};

const RATING_ITEMS = [
  { key: 'accuracy', label: '정확성' },
  { key: 'communication', label: '의사소통' },
  { key: 'cleanliness', label: '청결도' },
  { key: 'location', label: '위치' },
  { key: 'checkIn', label: '체크인' },
  { key: 'value', label: '가격 대비 만족도' },
] as const;

interface RoomReviewFormProps {
  roomId: number;
}

export default function RoomReviewForm({ roomId }: RoomReviewFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<ReviewFormState>(INITIAL_FORM_STATE);
  const { content, ratings, isLoading, showRatingsSection } = formState;

  const handleRatingChange = (key: keyof typeof ratings) => (value: number) => {
    setFormState((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    // 폼 외부 클릭을 감지하는 이벤트 핸들러
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭된 요소가 폼 내부에 없는지 확인
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        // 없으면 레이팅섹션 닫기
        setFormState((prev) => ({
          ...prev,
          showRatingsSection: false,
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setFormState((prev) => ({ ...prev, isLoading: true }));

    const response = await createReview(roomId, {
      content: content.trim(),
      ...ratings,
    });
    setFormState((prev) => ({ ...prev, isLoading: false }));

    if (!response.success) {
      switch (response.status) {
        case 401:
          router.push(ROUTES.LOGIN); // 로그인 모달
          break;
        default:
          toast({
            title: response.message,
            variant: 'destructive',
          });
      }
      return;
    }

    // 성공 시 폼 초기화
    setFormState(INITIAL_FORM_STATE);
    // 성공 시 토스트 알림
    toast({
      title: '리뷰가 작성되었습니다',
    });
  };

  return (
    <div
      ref={formRef}
      className="flex flex-col gap-4 pt-4"
    >
      {/* 별점 입력 섹션 */}
      {showRatingsSection && (
        <div className="grid grid-cols-2 gap-x-8 pb-4">
          {RATING_ITEMS.map(({ key, label }) => (
            <RoomReviewRating
              key={key}
              label={label}
              value={ratings[key]}
              onChange={handleRatingChange(key)}
            />
          ))}
        </div>
      )}
      {/* 리뷰 입력 섹션 */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={content}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
          onClick={() =>
            setFormState((prev) => ({
              ...prev,
              showRatingsSection: true,
            }))
          }
          placeholder="후기를 남겨주세요"
          className="flex-1 rounded-lg border border-neutral-03 px-6 py-4 text-sm focus:border-2 focus:border-black focus:outline-none"
        />
        <Button
          variant="secondary"
          isDisabled={!content.trim() || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? '작성 중...' : '작성'}
        </Button>
      </div>
    </div>
  );
}
