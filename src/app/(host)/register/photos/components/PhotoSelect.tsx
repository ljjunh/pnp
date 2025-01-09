import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { FaPlus } from 'react-icons/fa6';
import PhotoBox from './PhotoBox';

export default function PhotoSelect() {
  const { handleOpenModal } = useModal(MODAL_ID.ROOM_PHOTOS);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-4 text-3xl font-semibold">5장 이상의 사진을 선택하세요.</p>
          <span className="text-lg text-neutral-07">드래그하여 순서 변경</span>
        </div>
        <FaPlus
          size={60}
          className="cursor-pointer rounded-full bg-neutral-01 p-4 hover:bg-neutral-02"
          onClick={handleOpenModal}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 px-20 pt-10">
        <div className="col-span-2">
          <PhotoBox main />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <PhotoBox />
          <PhotoBox />
          <PhotoBox />
          <PhotoBox last />
        </div>
      </div>
    </>
  );
}
