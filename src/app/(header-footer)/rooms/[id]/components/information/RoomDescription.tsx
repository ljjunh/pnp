import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RoomDescriptionModalButton from '@/app/(header-footer)/rooms/[id]/components/information/RoomDescriptionModalButton';
import { Room } from '@/types/room';
import { formatElapsedTime } from '@/utils/formatElapsedTime';
import { truncateText } from '@/utils/truncateText';
import { ROUTES } from '@/constants/routeURL';
import { ImTrophy } from 'react-icons/im';
import { IoIosStar } from 'react-icons/io';

interface RoomDescriptionProps {
  roomId: Room['id'];
  location: Room['location'];
  roomTags: Room['tags'];
  description: Room['description'];
  host: Room['profile'];
  reviewsCount: Room['reviewsCount'];
  reviewsAverage: Room['reviewsAverage'];
  amenities: Room['amenities'];
}

export default function RoomDescription({
  roomId,
  location,
  roomTags,
  description,
  host,
  reviewsCount,
  reviewsAverage,
  amenities,
}: RoomDescriptionProps) {
  const availableAmenities = amenities.filter((amenity) => amenity.available === true).slice(0, 6);

  // TODO: tag 확인
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
          {reviewsAverage > 0 && (
            <span className="flex items-center gap-1 text-[17px]">
              <IoIosStar />
              {reviewsAverage.toFixed(2)}
              <span>·</span>
            </span>
          )}
          {reviewsCount > 0 && (
            <Link
              href={ROUTES.ROOMS.REVIEWS(roomId)}
              className="underline"
            >
              후기 {reviewsCount}개
            </Link>
          )}
        </span>
      </section>
      {availableAmenities.length > 0 && (
        <section className="grid grid-cols-2 gap-4 border-b border-neutral-04 py-6">
          {availableAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className="flex gap-1"
            >
              <Image
                src={`/icons/${amenity.icon}.svg`}
                alt={amenity.title}
                width={20}
                height={20}
              />
              <span className="text-sm text-shade-02">{amenity.title}</span>
            </div>
          ))}
        </section>
      )}
      <section className="flex items-center gap-5 border-b border-neutral-04 py-6">
        <div className="relative h-10 w-10 rounded-full bg-black">
          {host.user.image && (
            <Image
              src={host.user.image}
              fill
              alt="호스트 프로필 이미지"
              className="relative rounded-full object-cover"
            />
          )}
          {host.isSuperHost && <ImTrophy className="absolute bottom-0 right-0 text-primary-02" />}
        </div>

        <div className="flex flex-col">
          <span className="text-base">호스트 : {host.user.name} 님</span>
          <span className="flex gap-1 text-sm text-neutral-07">
            <span>{host.isSuperHost ? '슈퍼호스트' : '호스트'}</span>
            <span>·</span>
            <span>호스팅 경력 {formatElapsedTime(new Date(host.hostStartedAt))}</span>
          </span>
        </div>
      </section>
      <section className="py-12">
        {description && (
          <>
            <div>{truncateText(description)}</div>
            <RoomDescriptionModalButton description={description} />
          </>
        )}
      </section>
    </>
  );
}
