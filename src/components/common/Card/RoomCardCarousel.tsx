'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageLink } from '@/types/room';
import { getActiveDotIndex } from '@/utils/getActiveDotIndex';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface RoomCardCarouselProps {
  images: ImageLink[];
  liked?: boolean;
  onLike?: () => void;
}

export default function RoomCardCarousel({ images, liked = false, onLike }: RoomCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= images.length ? prev : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? prev : prev - 1));
  };

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-xl"
      role="region"
      aria-label="이미지 캐러셀"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 메인 이미지 */}
      <Image
        src={images[currentIndex]['imageLink']}
        alt={`숙소 이미지 ${currentIndex + 1}/${images.length}`}
        role="img"
        aria-label={`숙소 이미지 ${currentIndex + 1}/${images.length}`}
        fill
        className="object-cover transition-transform duration-300 ease-in-out"
      />
      {/* 좋아요 버튼 */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onLike?.();
        }}
        className="absolute right-3 top-3 z-10 hover:scale-105"
      >
        {liked ? (
          <AiFillHeart
            size={24}
            className="text-primary-02"
          />
        ) : (
          <AiOutlineHeart
            size={24}
            className="text-white"
          />
        )}
      </button>
      {/* 네비게이션 버튼(호버일때만 표시) */}
      {isHovered && (
        <>
          {currentIndex !== 0 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handlePrevSlide();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-shade-01 p-2 opacity-90 transition hover:scale-105 hover:opacity-100"
            >
              <IoChevronBack size={16} />
            </button>
          )}
          {currentIndex !== images.length - 1 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleNextSlide();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-shade-01 p-2 opacity-90 transition hover:scale-105 hover:opacity-100"
            >
              <IoChevronForward size={16} />
            </button>
          )}
        </>
      )}

      {/* 페이지네이션 닷 */}
      {images.length > 1 && (
        <div className="absolute bottom-2 flex w-full justify-center gap-1">
          {Array(Math.min(5, images.length))
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                role="tab"
                className={`h-1.5 w-1.5 rounded-full ${
                  index === getActiveDotIndex(currentIndex, images.length)
                    ? 'bg-white'
                    : 'bg-white/50'
                }`}
              />
            ))}
        </div>
      )}
    </div>
  );
}
