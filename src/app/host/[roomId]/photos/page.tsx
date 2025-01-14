'use client';

// import { useState } from 'react';
import ModalProvider from '@/components/common/ModalProvider/ModalProvider';
import { MODAL_ID } from '@/constants/modal';
// import PhotoSelect from './components/PhotoSelect';
import PhotoUpload from './components/PhotoUpload';
import PhotoUploadModal from './components/PhotoUploadModal';

export default function Photos() {
  // const [step, setStep] = useState<PHOTO_STEP>(PHOTO_STEP.SELECT);

  return (
    <>
      <div className="px-80 py-11 pb-28">
        {/* {step === PHOTO_STEP.UPLOAD && <PhotoUpload />}
        {step === PHOTO_STEP.SELECT && <PhotoSelect />} */}
        <PhotoUpload />
      </div>
      <ModalProvider modalId={MODAL_ID.ROOM_PHOTOS}>
        <PhotoUploadModal />
      </ModalProvider>
      <input
        type="hidden"
        name="step"
        value="photos"
      />
    </>
  );
}
