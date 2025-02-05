import { RecentlyViewedCard } from '@/app/(user)/wishlists/components/RecentlyViewedCard';
import { WishlistsCard } from '@/app/(user)/wishlists/components/WishlistsCard';
import { getRecentView, getScrapList } from '@/apis/wishlists/queries';

export default async function Wishlists() {
  const recentViews = await getRecentView();
  const scrapList = await getScrapList();

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-screen-2xl flex-col gap-8 px-20 py-12">
        <h1 className="text-3xl font-medium">위시리스트</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* 최근 조회 */}
          <RecentlyViewedCard thumbnail={recentViews[0]?.thumbnail || '/images/05.avif'}/>
          {/* 위시리스트 폴더 */}
          {scrapList.length > 0 && <WishlistsCard thumbnail={scrapList[0].thumbnail!} scrapListLength={scrapList.length}/>}
        </div>
      </div>
    </div>
  );
}
