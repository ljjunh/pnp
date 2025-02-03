'use client';

import { useContext, useEffect, useState } from 'react';
import PhotoSelect from '@/app/host/[roomId]/photos/components/PhotoSelect';
import PhotoUpload from '@/app/host/[roomId]/photos/components/PhotoUpload';
import PhotoUploadModal from '@/app/host/[roomId]/photos/components/PhotoUploadModal';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { MODAL_ID } from '@/constants/modal';
import { PHOTO_STEP } from '@/constants/registerStep';
import { RegisterContext } from '../components/RegisterContext';

export interface Image {
  imageFiles: File[];
  imageUrls: string[]; // blob url
  serverUrls: string[]; // server url
}

export default function Photos() {
  const { currentStep, setIsInnerStep, setCurrentStep } = useContext(RegisterContext);
  const [dataTransfer, setDataTransfer] = useState<DataTransfer | null>(null);
  const [images, setImages] = useState<Image>({
    imageFiles: [],
    imageUrls: [],
    serverUrls: [],
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDataTransfer(new DataTransfer());
    }
  }, []);

  useEffect(() => {
    if (!currentStep) {
      setIsInnerStep(true);
      setCurrentStep(PHOTO_STEP.UPLOAD);
    }
  }, []);

  useEffect(() => {
    return () => {
      setIsInnerStep(false);
      setCurrentStep(undefined);
    };
  }, [setIsInnerStep, setCurrentStep]);

  useEffect(() => {
    if (dataTransfer && images.imageFiles.length > 0) {
      images.imageFiles.forEach((file) => {
        const newFile = new File([file], file.name, { type: file.type });
        dataTransfer.items.add(newFile);
      });
    }
  }, [images.imageFiles, dataTransfer]);

  return (
    <>
      <div className="px-60 py-11 pb-28">
        {currentStep === PHOTO_STEP.UPLOAD && <PhotoUpload />}
        {currentStep === PHOTO_STEP.SELECT && (
          <PhotoSelect
            images={images}
            setImages={setImages}
          />
        )}
      </div>
      <ModalProvider modalId={MODAL_ID.ROOM_PHOTOS}>
        <PhotoUploadModal
          images={images}
          setImages={setImages}
          setCurrentStep={setCurrentStep}
        />
      </ModalProvider>
      <input
        type="hidden"
        name="step"
        value="photos"
      />
      <input
        type="file"
        name="images"
        className="hidden"
        multiple
        ref={(ref) => {
          if (ref && dataTransfer) {
            ref.files = dataTransfer.files;
          }
        }}
      />
    </>
  );
}
