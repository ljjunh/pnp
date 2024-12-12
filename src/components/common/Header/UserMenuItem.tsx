import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface UserMenuItemProps {
  id: string;
  label: string;
  hasDivider?: boolean; // 하단 구분선 유무
  href?: string; // 링크용 경로
}

export default function UserMenuItem({ id, label, hasDivider, href }: UserMenuItemProps) {
  const handleClick = async () => {
    switch (id) {
      case 'logout':
        // 로그아웃 처리
        try {
          await signOut();
        } catch (error) {
          console.error('로그아웃 중 오류가 발생했습니다:', error);
        }
        break;
    }
  };

  const content = (
    <div className="px-4 py-3 text-neutral-08 transition hover:bg-neutral-01">{label}</div>
  );

  return (
    <>
      {href ? (
        <Link href={href}>{content}</Link>
      ) : (
        <button
          onClick={handleClick}
          className="w-full text-left"
        >
          {content}
        </button>
      )}
      {hasDivider && <hr className="my-2 border-neutral-03" />}
    </>
  );
}
