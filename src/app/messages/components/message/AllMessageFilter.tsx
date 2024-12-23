import { FilterItem } from '@/types/message';
import { IoIosArrowDown } from 'react-icons/io';

interface AllMessageFilterProps {
  showFilter: boolean;
  toggleFilter: () => void;
  filterItems: FilterItem[];
}

export function AllMessageFilter({ showFilter, toggleFilter, filterItems }: AllMessageFilterProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={toggleFilter}
        className="relative flex items-center gap-1 rounded-3xl bg-black px-4 py-2 text-sm text-white"
      >
        전체
        <IoIosArrowDown
          className={`size-4 transition-all duration-300 ${showFilter && 'rotate-180'}`}
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute -left-4 top-12 z-10 w-[22rem] rounded-xl bg-white drop-shadow-2xl transition-all duration-300 ease-in-out ${showFilter ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-95 opacity-0'}`}
          role="menu"
          aria-expanded={showFilter}
        >
          <div className="flex flex-col gap-1 px-2 py-4 text-base font-medium text-black">
            {filterItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={toggleFilter}
                  className="flex w-full items-center gap-5 rounded-3xl px-4 py-3 hover:bg-gray-100"
                >
                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </button>
      {/* 클릭 효과 넣기*/}
      <button className="rounded-3xl border px-4 py-2 text-sm">읽지 않음</button>
    </div>
  );
}
