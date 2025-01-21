'use client';

import { useState } from 'react';
import Link from 'next/link';
import UserButton from '@/components/common/Header/UserButton';
import UserMenu from '@/components/common/Header/UserMenu';
import { ROUTES } from '@/constants/routeURL';
import { BiGlobe } from 'react-icons/bi';
import { useSession } from '@/hooks/useSession';

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { authenticated, user } = useSession();

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex items-center gap-2">
      <Link
        href={ROUTES.HOME}
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
        isLoggedIn={authenticated}
        onClick={toggleOpen}
        profileImage={user?.image || undefined}
      />
      <UserMenu
        isLoggedIn={authenticated}
        isOpen={isOpen}
        onToggleOpen={toggleOpen}
      />
    </div>
  );
}
