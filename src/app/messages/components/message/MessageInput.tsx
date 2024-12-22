import { IoImageOutline } from 'react-icons/io5';

export function MessageInput() {
  return (
    <div className="flex h-24 items-center gap-3 px-10">
      <IoImageOutline className="size-7" />
      <form className="relative w-full text-base">
        <input
          type="text"
          placeholder="메세지를 입력하세요."
          className="w-full rounded-3xl border border-gray-300 py-2 pl-6 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
        />
      </form>
    </div>
  );
}
