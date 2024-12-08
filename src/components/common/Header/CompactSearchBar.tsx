import SearchButton from '@/components/common/Button/SearchButton';

export default function CompactSearchBar() {
  return (
    <div className="w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md">
      <div className="flex flex-row items-center justify-between">
        <div className="truncate px-6 text-sm">어디든지</div>
        <div className="flex-1 truncate border-x-[1px] px-6 text-center text-sm">언제든 일주일</div>
        <div className="flex flex-row items-center gap-3 truncate pl-6 pr-2 text-sm text-neutral-07">
          <div>게스트 추가</div>
          <SearchButton variant="compact" />
        </div>
      </div>
    </div>
  );
}
