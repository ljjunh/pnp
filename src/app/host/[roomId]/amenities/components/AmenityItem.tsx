import { cn } from '@/lib/utils';
import { AMENITY_LIST } from '@/constants/amenity';

interface AmenityItemProps {
  id: number;
  content: string;
  isClicked: boolean;
  handleSelect: (id: number) => void;
}

export default function AmenityItem({ id, content, isClicked, handleSelect }: AmenityItemProps) {
  const selected = 'border-black bg-neutral-02 border-2';

  return (
    <div
      className={cn(
        'flex cursor-pointer flex-col space-y-1.5 rounded-xl border border-neutral-03 p-6 hover:border-black hover:bg-neutral-02',
        isClicked && selected,
      )}
      onClick={() => handleSelect(id)}
      role="button"
      tabIndex={0}
      aria-pressed={isClicked}
      onKeyDown={(e) => e.key === 'Enter' && handleSelect(id)}
    >
      {AMENITY_LIST[content].icon}
      <span className="whitespace-nowrap text-lg">{AMENITY_LIST[content].name}</span>
    </div>
  );
}
