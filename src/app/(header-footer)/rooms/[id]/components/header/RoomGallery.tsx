import Image from 'next/image';
import { CgMenuGridO } from 'react-icons/cg';

const DUMMY_DATA = [
  '/images/03.avif',
  '/images/02.avif',
  '/images/01.avif',
  '/images/04.avif',
  '/images/06.avif',
  '/images/05.avif',
];

export default function RoomGallery() {
  return (
    <div className="grid-row-2 relative grid w-full grid-cols-4 gap-[0.7vw] pt-6">
      <div className="relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-l-xl">
        <Image
          src={DUMMY_DATA[0]}
          alt="숙소이미지"
          fill
          className="object-cover transition-opacity duration-200 hover:brightness-[0.80]"
        />
      </div>

      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={DUMMY_DATA[1]}
          alt="숙소 이미지"
          fill
          className="object-cover transition-opacity duration-200 hover:brightness-[0.80]"
        />
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-tr-lg">
        <Image
          src={DUMMY_DATA[2]}
          alt="숙소 이미지"
          fill
          className="object-cover transition-opacity duration-200 hover:brightness-[0.80]"
        />
      </div>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={DUMMY_DATA[3]}
          alt="숙소 이미지"
          fill
          className="object-cover transition-opacity duration-200 hover:brightness-[0.80]"
        />
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-br-xl">
        <Image
          src={DUMMY_DATA[4]}
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
