'use client';

import { useState } from 'react';
import Link from 'next/link';
import UserButton from '@/components/common/Header/UserButton';
import UserMenu from '@/components/common/Header/UserMenu';
import { BiGlobe } from 'react-icons/bi';

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn] = useState(false); // 로그인 상태 관리 로직으로 수정
  const [profileImage] = useState<string | undefined>(); // 유저 프로필 이미지로 변경

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex items-center gap-2">
      <Link
        href="/"
        className="truncate rounded-full px-4 py-3 text-sm transition hover:bg-neutral-01"
      >
        당신의 공간을 에어비앤비하세요
      </Link>

      <button
        className="rounded-full p-3 transition hover:bg-neutral-01"
        aria-label="언어 선택"
      >
        <BiGlobe size={18} />
      </button>

      <UserButton
        isLoggedIn={isLoggedIn}
        onClick={toggleOpen}
        profileImage={profileImage}
      />
      <UserMenu
        isLoggedIn={isLoggedIn}
        isOpen={isOpen}
      />
    </div>
  );
}
