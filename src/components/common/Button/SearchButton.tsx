import { FaSearch } from 'react-icons/fa';

const baseStyles =
  'bg-primary-02 flex items-center justify-center transition-colors text-shade-01 rounded-full';
const variants = {
  compact: 'p-2.5',
  filtered: 'p-4',
  expanded: 'gap-2 p-4',
};

interface SearchButtonProps {
  variant?: 'compact' | 'filtered' | 'expanded';
}

export default function SearchButton({ variant = 'compact' }: SearchButtonProps) {
  // compact : 기본
  // filtered : 확장
  // expanded : 확장 + 필터선택

  const iconSize = variant === 'compact' ? 12 : 16;

  return (
    <button
      aria-label="검색"
      className={`${baseStyles} ${variants[variant]}`}
    >
      <FaSearch size={iconSize} />
      {variant === 'expanded' && <span className="pr-1">검색</span>}
    </button>
  );
}
