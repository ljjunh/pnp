'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Host, User } from '@/types/user';
import { ROUTES } from '@/constants/routeURL';
import { MdVerifiedUser } from 'react-icons/md';

interface HostInformationProps {
  hostName: User['name'];
  hostImage: User['image'];
  isSuperHost: Host['isSuperHost'];
}

export function HostInformation({ hostName, hostImage, isSuperHost }: HostInformationProps) {
  return (
    <div className="flex flex-col gap-5 px-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">호스트: {hostName} 님</h2>
        <div className="relative size-14 rounded-full">
          {hostImage && (
            <Link href={ROUTES.HOME}>
              <Image
                src={hostImage}
                alt={`${hostName}의 프로필 이미지`}
                fill
                className="relative rounded-full object-cover"
              />
            </Link>
          )}
          {hostImage && isSuperHost && (
            <div className="absolute -bottom-1 -right-2 rounded-full bg-primary-02 p-1.5 text-shade-01">
              <MdVerifiedUser />
            </div>
          )}
        </div>
      </div>
      <Link
        href={ROUTES.HOME}
        className="w-fit"
      >
        <span className="inline-block underline">더 보기</span>
      </Link>
    </div>
  );
}
