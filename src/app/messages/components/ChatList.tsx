import { useState } from 'react';
import Image from 'next/image';
import { BsSuitcaseLg } from 'react-icons/bs';
import { BsChatSquare } from 'react-icons/bs';
import { FaAirbnb } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosSearch } from 'react-icons/io';
import { VscSettings } from 'react-icons/vsc';

const filterItems = [
  {
    id: 1,
    label: '전체',
    icon: BsChatSquare,
  },
  {
    id: 2,
    label: '여행',
    icon: BsSuitcaseLg,
  },
  {
    id: 3,
    label: '지원',
    icon: FaAirbnb,
  },
];

export function ChatList() {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section className="flex w-1/4 flex-col gap-8 px-6 py-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between transition-all duration-300">
          {!showSearchBar ? (
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
          ) : (
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
          )}
        </div>
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
      </div>

      <ul>
        <li className="flex w-full gap-5 rounded-md bg-gray-100 px-3 py-3 pb-4 text-sm text-gray-400">
          <div className="relative h-14 w-14 shrink-0">
            <div className="relative h-full w-full">
              <Image
                src="/images/05.avif"
                alt="room"
                fill
                className="rounded-md object-cover"
              />
              <div className="absolute -bottom-3 -right-3 h-10 w-10">
                <Image
                  src="/images/05.avif"
                  alt="profile"
                  fill
                  className="rounded-full border-2 border-white object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex justify-between">
              <p>호스트 이름</p>
              <p>0000.00.00.</p>
            </div>
            <div>에어비앤비 업데이트</div>
            <div>0000년 0월 00일 ~ 00일</div>
          </div>
        </li>
      </ul>
    </section>
  );
}
