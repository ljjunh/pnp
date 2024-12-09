import Link from 'next/link';

interface UserMenuItemProps {
  id: string;
  label: string;
  hasDivider?: boolean; // 하단 구분선 유무
  href?: string; // 링크용 경로
}

export default function UserMenuItem({ id, label, hasDivider, href }: UserMenuItemProps) {
  const handleClick = () => {
    switch (id) {
      case 'login':
        // 로그인 모달 열기
        console.log('로그인 모달 열기');
        break;
      case 'signup':
        // 회원가입 모달 열기
        console.log('회원가입 모달 열기');
        break;
      case 'logout':
        // 로그아웃 처리
        console.log('로그아웃 처리');
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
