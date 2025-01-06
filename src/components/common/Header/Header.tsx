import HeaderLayout from '@/app/(header-footer)/components/HeaderLayout';
import CompactSearchBar from '@/components/common/Header/CompactSearchBar';
import ExpandedSearchBar from '@/components/common/Header/ExpandedSearchBar';
import MainLogo from '@/components/common/Header/MainLogo';
import UserNav from '@/components/common/Header/UserNav';

export default function Header() {
  return (
    <header
      role="banner"
      className="px-30 fixed top-0 z-10 w-full border-b bg-shade-01 py-4 lg:px-60"
    >
      <HeaderLayout
        logo={<MainLogo />}
        compactSearchBar={<CompactSearchBar />}
        expandedSearchBar={<ExpandedSearchBar />}
        userNav={<UserNav />}
      />
    </header>
  );
}
