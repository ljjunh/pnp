import SearchButton from '@/components/common/Button/SearchButton';

interface ExpandedSearchBarProps {
  activeSection: Section | null;
  onSectionChange: (section: Section | null) => void;
}

type Section = 'location' | 'checkIn' | 'checkOut' | 'guests';

export default function ExpandedSearchBar({
  activeSection,
  onSectionChange,
}: ExpandedSearchBarProps) {
  return (
    <div
      role="search"
      aria-label="숙소 검색"
      className={`w-full cursor-pointer rounded-full border-[1px] bg-white shadow-sm transition-all hover:shadow-md`}
    >
      <div className={`flex rounded-full ${activeSection ? 'bg-neutral-02' : ''}`}>
        {/* 여행지 */}
        <div
          onClick={() => onSectionChange('location')}
          className={`rounded-full py-3.5 pl-8 pr-12 transition-colors ${activeSection === 'location' ? 'rounded-full bg-shade-01 hover:bg-shade-01' : ''} ${activeSection ? 'hover:bg-neutral-04' : 'hover:bg-neutral-02'}`}
        >
          <div className="text-sm">여행지</div>
          <input
            type="text"
            placeholder="여행지 검색"
            className="text-md w-full bg-transparent text-neutral-07 outline-none placeholder:text-neutral-07"
            readOnly={activeSection !== 'location'}
          />
        </div>

        <div className="h-10 w-[1px] self-center bg-neutral-04" />

        {/* 체크인 */}
        <div
          onClick={() => onSectionChange('checkIn')}
          className={`rounded-full py-3.5 pl-6 pr-14 transition-colors ${activeSection === 'checkIn' ? 'rounded-full bg-shade-01 hover:bg-shade-01' : ''} ${activeSection ? 'hover:bg-neutral-04' : 'hover:bg-neutral-02'}`}
        >
          <div className="text-sm">체크인</div>
          <div className="text-md text-neutral-07">날짜 추가</div>
        </div>

        <div className="h-10 w-[1px] self-center bg-neutral-04" />

        {/* 체크아웃 */}
        <div
          onClick={() => onSectionChange('checkOut')}
          className={`rounded-full py-3.5 pl-6 pr-14 transition-colors ${activeSection === 'checkOut' ? 'rounded-full bg-shade-01 hover:bg-shade-01' : ''} ${activeSection ? 'hover:bg-neutral-04' : 'hover:bg-neutral-02'}`}
        >
          <div className="text-sm">체크아웃</div>
          <div className="text-md text-neutral-07">날짜 추가</div>
        </div>

        <div className="h-10 w-[1px] self-center bg-neutral-04" />

        {/* 여행자 & 검색 버튼 */}
        <div
          onClick={() => onSectionChange('guests')}
          className={`flex items-center rounded-full transition-colors ${
            activeSection === 'guests' ? 'rounded-full bg-shade-01 hover:bg-shade-01' : ''
          } ${activeSection ? 'hover:bg-neutral-04' : 'hover:bg-neutral-02'}`}
        >
          <div className="py-3.5 pl-6 pr-12">
            <div className="text-sm">여행자</div>
            <div className="text-md text-neutral-07">게스트 추가</div>
          </div>
          <div className="pr-2">
            <SearchButton variant={activeSection ? 'expanded' : 'filtered'} />
          </div>
        </div>
      </div>
    </div>
  );
}
