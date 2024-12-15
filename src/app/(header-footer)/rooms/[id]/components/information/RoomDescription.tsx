import React from 'react';
import { Room } from '@/types/room';
import { IoIosArrowForward, IoIosStar } from 'react-icons/io';

interface RoomDescriptionProps {
  location: Room['location'];
  roomTags: Room['roomTags'];
  description: Room['description'];
}

export default function RoomDescription({ location, roomTags, description }: RoomDescriptionProps) {
  return (
    <>
      <section className="flex flex-col border-b border-neutral-04 py-8">
        <span className="text-2xl">{location}</span>
        <span className="flex gap-1 pt-1 text-base">
          {roomTags.map((tag, index) => (
            <React.Fragment key={tag.id}>
              <span>{tag.content}</span>
              {index !== roomTags.length - 1 && <span>·</span>}
            </React.Fragment>
          ))}
        </span>
        <span className="flex gap-1 text-base">
          <span className="flex items-center gap-1 text-[17px]">
            <IoIosStar />
            4.87
          </span>
          <span>·</span>
          <span className="underline">후기 221개</span>
        </span>
      </section>
      <section className="flex items-center gap-5 border-b border-neutral-04 py-6">
        <div className="h-10 w-10 rounded-full bg-black"></div>
        <div className="flex flex-col">
          <span className="text-base">호스트 : Seowoo 님</span>
          <span className="flex gap-1 text-sm text-neutral-07">
            <span>슈퍼호스트</span>
            <span>·</span>
            <span>호스팅 경력 6년</span>
          </span>
        </div>
      </section>
      <section className="border-b border-neutral-04 py-12">
        <div>{description}</div>

        <button
          type="button"
          className="mt-4 flex items-center"
        >
          <span className="underline">더 보기</span>
          <IoIosArrowForward size={19} />
        </button>
      </section>
    </>
  );
}
