'use client';

import { useState } from 'react';
import { BackBtn } from '@/app/(user)/components/BackBtn';
import { EditBtn } from '@/app/(user)/recently-viewed/components/EditBtn';
import { RoomCard } from '@/app/(user)/recently-viewed/components/RoomCard';
import { RecentViewResponse } from '@/types/recent';
import { ROUTES } from '@/constants/routeURL';

interface RecentlyViewedClientProps {
  recentViews: RecentViewResponse[];
}

export function RecentlyViewedClient({ recentViews }: RecentlyViewedClientProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-screen-2xl px-20 py-6">
        <div className="flex w-full items-center justify-between">
          <BackBtn url={ROUTES.USER.WISHLISTS} />
          <EditBtn
            isEdit={isEdit}
            toggleIsEdit={toggleIsEdit}
          />
        </div>
        <h1 className="my-6 text-3xl font-medium">최근 조회</h1>
        {/* 최근 조회 리스트 날짜별로 매핑해서 나열 */}
        <div>
          <h3 className="font-medium">날짜</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recentViews.map((recentView) => (
              <RoomCard
                key={recentView.id}
                isEdit={isEdit}
                recentView={recentView}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
