import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { ROUTES } from '@/constants/routeURL';
import { useAuthStore } from '@/store/useAuthStore';

interface UserMenuItemProps {
  id: string;
  label: string;
  hasDivider?: boolean; // 하단 구분선 유무
  href?: string; // 링크용 경로
  onToggleOpen: () => void;
}

export default function UserMenuItem({
  id,
  label,
  hasDivider,
  href,
  onToggleOpen,
}: UserMenuItemProps) {
  const pathname = usePathname();
  const clearTokens = useAuthStore((state) => state.clearTokens);

  // 로그인, 회원가입 메뉴 이동시 url 쿠키에 저장
  const handleLogin = () => {
    if (!pathname.includes(ROUTES.LOGIN)) {
      document.cookie = `prevPath=${pathname};max-age=${60 * 30};path=/`;
    }
    onToggleOpen();
  };

  // 로그아웃 로직
  const handleClick = () => {
    switch (id) {
      case 'logout':
        // 로그아웃 처리
        deleteCookie('accessToken');
        clearTokens();
        // 로그아웃 후 메인 페이지로 이동
        window.location.href = '/';
        break;
    }
  };

  const content = (
    <div className="px-4 py-3 text-neutral-08 transition hover:bg-neutral-01">{label}</div>
  );

  return (
    <>
      {href ? (
        href === '/signin' ? (
          // 로그인, 회원 가입 메뉴
          <Link
            href={href}
            onClick={handleLogin}
          >
            {content}
          </Link>
        ) : (
          // href 있는 메뉴
          <Link
            href={href}
            onClick={onToggleOpen}
          >
            {content}
          </Link>
        )
      ) : (
        // href 없는 메뉴
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
