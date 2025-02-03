import Image from 'next/image';
import { FaTrashCan } from 'react-icons/fa6';

interface PreviewPhotoProps {
  imageUrl: string;
  id: number;
  handleDeletePreviewImage: (id: number) => void;
}

export default function PreviewPhoto({
  imageUrl,
  id,
  handleDeletePreviewImage,
}: PreviewPhotoProps) {
  return (
    <div className="relative h-80 w-80 overflow-hidden">
      <Image
        src={imageUrl}
        alt="미리보기 이미지"
        fill
        className="rounded-2xl object-cover object-center"
        sizes="(max-width: 768px) 100vw, 320px"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <div
        className="absolute right-0 top-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black"
        onClick={() => handleDeletePreviewImage(id)}
      >
        <FaTrashCan
          color="white"
          size={20}
        />
      </div>
    </div>
  );
}
