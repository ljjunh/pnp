import Image from 'next/image';
import { Room } from '@/types/room';
import { CgMenuGridO } from 'react-icons/cg';

interface RoomGalleryProps {
  images: Room['images'];
}

export default function RoomGallery({ images }: RoomGalleryProps) {
  return (
    <div className="grid-row-2 relative grid w-full grid-cols-4 gap-[0.7vw] pt-6">
      <div className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-l-xl">
        <Image
          src={images[0].imageLink}
          alt="숙소이미지"
          fill
          className="object-cover transition-opacity duration-200 hover:brightness-[0.80]"
        />
      </div>

      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={images[1].imageLink}
          alt="숙소 이미지"
          fill
          className="object-cover transition-opacity duration-200 hover:brightness-[0.80]"
        />
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-tr-lg">
        <Image
          src={images[2].imageLink}
          alt="숙소 이미지"
          fill
          className="object-cover transition-opacity duration-200 hover:brightness-[0.80]"
        />
      </div>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={images[3].imageLink}
          alt="숙소 이미지"
          fill
          className="object-cover transition-opacity duration-200 hover:brightness-[0.80]"
        />
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-br-xl">
        <Image
          src={images[4].imageLink}
          alt="숙소 이미지"
          fill
          className="object-cover transition-opacity duration-200 hover:brightness-[0.80]"
        />
      </div>
      <button className="absolute bottom-6 right-6 flex items-center gap-2 rounded-lg border border-shade-02 bg-shade-01 px-4 py-1.5 hover:brightness-[0.95]">
        <CgMenuGridO size={18} />
        <span className="text-sm">사진 모두 보기</span>
      </button>
    </div>
  );
}
