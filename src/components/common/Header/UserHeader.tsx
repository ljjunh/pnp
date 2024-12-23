import MainLogo from '@/components/common/Header/MainLogo';
import UserNav from '@/components/common/Header/UserNav';

export default function UserHeader() {
  return (
    <header
      role="banner"
      className="fixed top-0 z-10 w-full border-b bg-shade-01 py-4 px-6"
    >
      <div
        aria-label="사이트 헤더"
        className="flex items-center justify-between"
      >
        {/* 왼쪽: 로고 */}
        <div className="w-32">
          <MainLogo />
        </div>

        {/* 오른쪽: 유저 네비게이션 */}
        <UserNav />
      </div>
    </header>
  );
}
