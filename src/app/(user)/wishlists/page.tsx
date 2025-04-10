import { RecentlyViewedCard } from '@/app/(user)/wishlists/components/RecentlyViewedCard';
import { WishlistsCard } from '@/app/(user)/wishlists/components/WishlistsCard';

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
      <div className="flex w-full max-w-screen-2xl flex-col gap-8 px-20 py-12">
        <h1 className="text-3xl font-medium">위시리스트</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* 최근 조회 */}
          <RecentlyViewedCard />
          {/* 위시리스트 폴더 */}
          {images.map((image, index) => (
            <WishlistsCard
              key={index}
              image={image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
