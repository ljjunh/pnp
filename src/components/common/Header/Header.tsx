import CompactSearchBar from '@/components/common/Header/CompactSearchBar';
import MainLogo from '@/components/common/Header/MainLogo';
import UserNav from '@/components/common/Header/UserNav';

export default function Header() {
  return (
    <header
      role="banner"
      className="px-30 fixed top-0 z-10 w-full border-b bg-shade-01 py-4 lg:px-60"
    >
      <div
        aria-label="사이트 헤더"
        className="flex items-center justify-between"
      >
        {/* 왼쪽: 로고 */}
        <div className="w-32">
          <MainLogo />
        </div>

        {/* 가운데: 검색바 - max-w로 너비 제한 */}
        <div className="max-w-[370px]">
          <CompactSearchBar />
        </div>

        {/* 오른쪽: 유저 네비게이션 */}
        <UserNav />
      </div>
    </header>
  );
}
