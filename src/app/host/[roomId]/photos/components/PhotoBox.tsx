import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { FaPlus, FaTrashCan } from 'react-icons/fa6';

interface PhotoBoxProps {
  main?: boolean;
  last?: boolean;
  imageUrl?: string;
  id?: number;
  handleDeleteImage?: (id: number) => void;
}

export default function PhotoBox({ main, last, imageUrl, id, handleDeleteImage }: PhotoBoxProps) {
  const { handleOpenModal } = useModal(MODAL_ID.ROOM_PHOTOS);

  return (
    <div
      className={cn(
        'relative flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-neutral-03 hover:border-solid hover:border-neutral-05',
        main ? 'h-[500px]' : 'h-[300px]',
      )}
    >
      {main && (
        <span className="absolute left-3 top-3 rounded-xl bg-white px-6 py-3 font-semibold">
          커버 사진
        </span>
      )}
      {handleDeleteImage && id !== undefined && (
        <div
          className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white"
          onClick={() => handleDeleteImage(id)}
        >
          <FaTrashCan size={20} />
        </div>
      )}
      {last ? (
        <div
          className="flex flex-col items-center justify-center space-y-3"
          onClick={handleOpenModal}
        >
          <FaPlus
            size={40}
            color="gray"
          />
          <span className="text-neutral-08">추가</span>
        </div>
      ) : (
        <div
          className={cn('relative overflow-hidden', main ? 'h-[500px] w-full' : 'h-[300px] w-full')}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="미리보기 이미지"
              fill
              className="rounded-2xl object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
