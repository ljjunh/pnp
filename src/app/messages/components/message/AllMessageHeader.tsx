import { IoIosSearch } from 'react-icons/io';
import { VscSettings } from 'react-icons/vsc';

interface AllMessageHeaderProps {
  toggleSearchBar: () => void;
}

export function AllMessageHeader({ toggleSearchBar }: AllMessageHeaderProps) {
  return (
    <>
      <h1 className="text-2xl font-medium">메시지</h1>
      <div className="flex gap-2">
        <div
          onClick={toggleSearchBar}
          className="cursor-pointer rounded-full bg-gray-100 p-2"
        >
          <IoIosSearch className="size-5" />
        </div>
        {/* 설정 모달 넣기 */}
        <div className="cursor-pointer rounded-full bg-gray-100 p-2">
          <VscSettings className="size-5" />
        </div>
      </div>
    </>
  );
}
