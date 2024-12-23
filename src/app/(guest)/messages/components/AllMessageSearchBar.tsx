import { IoIosSearch } from 'react-icons/io';

interface AllMessageSearchBarProps {
  toggleSearchBar: () => void;
}

export function AllMessageSearchBar({ toggleSearchBar }: AllMessageSearchBarProps) {
  return (
    <>
      <form className="relative w-full text-sm">
        <IoIosSearch className="absolute left-3 top-1/2 size-5 -translate-y-1/2" />

        <input
          autoFocus
          type="search"
          placeholder="전체 메세지 검색"
          className="w-full rounded-3xl border border-gray-300 py-2 pl-10 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
        />
      </form>
      <button
        onClick={toggleSearchBar}
        className="ml-1 min-w-14 rounded-l py-2 text-sm hover:bg-gray-100"
      >
        취소
      </button>
    </>
  );
}
