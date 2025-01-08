'use client';

import { useToast } from '@/hooks/use-toast';
import { LuShare } from 'react-icons/lu';

export default function RoomShareUrlButton() {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: '링크가 복사되었습니다.',
      });
    } catch {
      toast({
        title: '링크 복사에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg p-2 text-sm underline hover:bg-neutral-01"
      onClick={handleShare}
    >
      <LuShare size={16} />
      공유하기
    </button>
  );
}
