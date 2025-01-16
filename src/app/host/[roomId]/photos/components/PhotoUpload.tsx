import PhotoUploadButton from '@/app/host/[roomId]/photos/components/PhotoUploadButton';
import { MdAddPhotoAlternate } from 'react-icons/md';

export default function PhotoUpload() {
  return (
    <>
      <p className="mb-4 text-3xl font-semibold">주택 사진 추가하기</p>
      <span className="text-lg text-neutral-07">
        숙소 등록을 시작하려면 사진 5장을 제출하셔야 합니다. 나중에 추가하거나 변경하실 수 있습니다.
      </span>
      <div className="mx-auto mt-12 flex h-[600px] w-full flex-col items-center justify-center space-y-8 rounded-2xl border-2 border-dashed border-neutral-06 bg-neutral-02">
        <MdAddPhotoAlternate
          size={130}
          color="Gray"
        />
        <PhotoUploadButton />
      </div>
    </>
  );
}
