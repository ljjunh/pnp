import { useContext, useEffect } from 'react';
import { RegisterContext } from '@/app/host/[roomId]/components/RegisterContext';
import PhotoBox from '@/app/host/[roomId]/photos/components/PhotoBox';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { PHOTO_STEP } from '@/constants/registerStep';
import { FaPlus } from 'react-icons/fa6';
import { Image } from '../page';

interface PhotoSelectProps {
  images: Image;
  setImages: (images: Image) => void;
}

export default function PhotoSelect({ images, setImages }: PhotoSelectProps) {
  const { setCurrentStep } = useContext(RegisterContext);
  const { handleOpenModal } = useModal(MODAL_ID.ROOM_PHOTOS);

  // image배열이 비어있으면 upload 단계로 이동
  useEffect(() => {
    if (images.imageUrls.length === 0) {
      setCurrentStep(PHOTO_STEP.UPLOAD);
      return;
    }
  }, [images, setCurrentStep]);

  const handleDeleteImage = (id: number) => {
    setImages({
      imageFiles: images.imageFiles.filter((_, index) => index !== id),
      imageUrls: images.imageUrls.filter((_, index) => index !== id),
      serverUrls: images.serverUrls.filter((_, index) => index !== id),
    });
  };

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
          <PhotoBox
            imageUrl={images.imageUrls[0]}
            id={0}
            handleDeleteImage={handleDeleteImage}
            main
          />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {images.imageUrls.slice(1).map((imageUrl, index) => (
            <PhotoBox
              key={`${imageUrl}-${index}`}
              id={index + 1}
              imageUrl={imageUrl}
              handleDeleteImage={handleDeleteImage}
            />
          ))}
          <PhotoBox last />
        </div>
      </div>
    </>
  );
}
