import Image from 'next/image';

const images = [
  '/images/05.avif',
  '/images/02.avif',
  '/images/04.avif',
  '/images/01.avif',
  '/images/03.avif',
  '/images/06.avif',
];

export default function Wishlists() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-screen-2xl px-20 py-12 flex flex-col gap-5">
        <h1 className="text-3xl font-medium">위시리스트</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-2"
            >
              <div className="aspect-square w-full rounded-xl p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                <div className="relative h-full w-full">
                  <Image
                    src={image}
                    alt="숙소 사진"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-base">최근 조회</h3>
                <p className="text-sm text-gray-400">오늘</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
