import { cn } from '@/lib/utils';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { BsThreeDots } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';
import { HiOutlinePhoto } from 'react-icons/hi2';

interface PhotoBoxProps {
  main?: boolean;
  last?: boolean;
}

export default function PhotoBox({ main, last }: PhotoBoxProps) {
  const { handleOpenModal } = useModal(MODAL_ID.ROOM_PHOTOS);

  return (
    <div
      className={cn(
        'relative flex w-full items-center justify-center rounded-xl border-2 border-dashed border-neutral-03 hover:border-solid',
        main ? 'h-[500px]' : 'h-[300px]',
      )}
    >
      {main && (
        <span className="absolute left-3 top-3 rounded-xl bg-white px-6 py-3 font-semibold">
          커버 사진
        </span>
      )}
      <div className="absolute right-3 top-3 cursor-pointer rounded-full bg-white p-2">
        <BsThreeDots size={24} />
      </div>
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
        <HiOutlinePhoto
          size={40}
          color="gray"
        />
      )}
    </div>
  );
}
