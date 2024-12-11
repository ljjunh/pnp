'use client';

import { useState } from 'react';
import Link from 'next/link';
import RoomCardCarousel from '@/components/common/Card/RoomCardCarousel';
import RoomCardSummary from '@/components/common/Card/RoomCardSummary';
import { ROUTES } from '@/constants/routeURL';

// Todo: api 연결하면 타입설정 다시하고 apis로 옮겨서 import해서 사용
interface RoomCardProps {
  id: number;
  images: string[];
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  review?: string;
}

export default function RoomCard({
  id,
  images,
  location,
  distance,
  dates,
  price,
  rating,
  review,
}: RoomCardProps) {
  // TODO : 좋아요 로직 작성 예정
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <Link
      href={ROUTES.ROOMS.DETAIL(id)}
      className="flex w-full flex-col gap-3"
    >
      <RoomCardCarousel
        images={images}
        liked={isLiked}
        onLike={handleLike}
      />
      <RoomCardSummary
        location={location}
        distance={distance}
        dates={dates}
        price={price}
        rating={rating}
        review={review}
      />
    </Link>
  );
}
