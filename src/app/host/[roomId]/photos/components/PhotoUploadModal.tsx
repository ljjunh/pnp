'use client';

import { ChangeEvent, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { MODAL_ID } from '@/constants/modal';
import { PHOTO_STEP } from '@/constants/registerStep';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { Image } from '../page';
import PreviewPhoto from './PreviewPhoto';

interface PhotoUploadModalProps {
  images: Image;
  setImages: (images: Image) => void;
  setCurrentStep: (currentStep: number | undefined) => void;
}

export default function PhotoUploadModal({
  images,
  setImages,
  setCurrentStep,
}: PhotoUploadModalProps) {
  const [previewImages, setPreviewImages] = useState<Image>({
    imageFiles: [],
    imageUrls: [],
    serverUrls: [],
  });
  const { handleCloseModal } = useModal(MODAL_ID.ROOM_PHOTOS);

  const handlePreviewImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = e.target.files;
    const fileArray: File[] = Array.from(files);

    const newImages = Array.from(files, (file: Blob) => URL.createObjectURL(file));
    const newServerUrls = fileArray.map((file) => `https://image${file.name}.jpg`);

    setPreviewImages({
      imageFiles: [...previewImages.imageFiles, ...fileArray],
      imageUrls: [...previewImages.imageUrls, ...newImages],
      serverUrls: [...previewImages.serverUrls, ...newServerUrls],
    });
  };

  const handleDeletePreviewImage = (id: number) => {
    setPreviewImages({
      imageFiles: previewImages.imageFiles.filter((_, index) => index !== id),
      imageUrls: previewImages.imageUrls.filter((_, index) => index !== id),
      serverUrls: previewImages.serverUrls.filter((_, index) => index !== id),
    });
  };

  const handleImageUpload = () => {
    if (previewImages.imageUrls.length === 0) return;

    setImages({
      imageFiles: [...images.imageFiles, ...previewImages.imageFiles],
      imageUrls: [...images.imageUrls, ...previewImages.imageUrls],
      serverUrls: [...images.serverUrls, ...previewImages.serverUrls],
    });

    setCurrentStep(PHOTO_STEP.SELECT);
    handleCloseModal();
  };

  return (
    <div className="w-[700px] px-7 py-4">
      <div className="flex items-center justify-between">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePreviewImageUpload}
          className="hidden"
          id="imageUpload"
        />
        <FaXmark
          size={40}
          onClick={handleCloseModal}
          className="cursor-pointer p-2 hover:rounded-full hover:bg-neutral-01"
        />
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold">사진 업로드</span>
          <span className="text-neutral-06">선택된 파일 없음</span>
        </div>
        <label htmlFor="imageUpload">
          <FaPlus
            size={40}
            className="cursor-pointer p-2 hover:rounded-full hover:bg-neutral-01"
          />
        </label>
      </div>
      {previewImages.imageUrls.length > 0 ? (
        <div className="mt-8 grid h-96 grid-cols-2 gap-2 overflow-auto">
          {previewImages.imageUrls.map((url, index) => (
            <PreviewPhoto
              key={`${url}-${index}`}
              id={index}
              imageUrl={url}
              handleDeletePreviewImage={handleDeletePreviewImage}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex h-96 w-full flex-col items-center justify-center space-y-4 rounded-2xl border-2 border-dashed border-neutral-05">
          <HiOutlinePhoto size={100} />
          <span className="text-2xl">사진 끌어다 놓기</span>
          <span>또는 사진 찾아보기</span>
          <label
            htmlFor="imageUpload"
            className="cursor-pointer rounded-xl bg-black px-8 py-3 text-xl text-white"
          >
            찾아보기
          </label>
        </div>
      )}

      <hr
        className="mt-6"
        color="LightGray"
      />
      <div className="flex items-center justify-end px-2 pt-4">
        <div
          className="cursor-pointer rounded-xl bg-black px-8 py-3 text-xl text-white"
          onClick={handleImageUpload}
        >
          업로드
        </div>
      </div>
    </div>
  );
}
