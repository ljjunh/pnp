import { BackBtn } from '@/app/(user)/wishlists/[id]/components/BackBtn';
import { Btn } from '@/app/(user)/wishlists/[id]/components/Btn';
import { SettingBtn } from '@/app/(user)/wishlists/[id]/components/SettingBtn';
import { WishlistCard } from '@/app/(user)/wishlists/[id]/components/WishlistCard';

const filters = ['날짜 입력하기', '게스트 1명', '공유하기'];

export default function WishlistsDetail() {
  return (
    <div className="flex w-full">
      <div className="w-[65%] px-5 pt-5">
        <div className="flex w-full items-center justify-between">
          <BackBtn />
          <SettingBtn />
        </div>
        <h1 className="my-5 text-2xl font-medium">위시리스트 폴더 명</h1>
        <div className="flex gap-2">
          {filters.map((filter, index) => (
            <Btn
              key={index}
              text={filter}
            />
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <WishlistCard />
        </div>
      </div>
      <div className="h-screen w-[35%] bg-black text-white">지도</div>
    </div>
  );
}
