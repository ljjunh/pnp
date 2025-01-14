import { cn } from '@/lib/utils';
import { AMENITY_LIST } from '@/constants/amenity';

interface AmenityItemProps {
  content: string;
  isClicked: boolean;
  handleSelect: (content: string) => void;
}

export default function AmenityItem({ content, isClicked, handleSelect }: AmenityItemProps) {
  const selected = 'border-black bg-neutral-02 border-2';

  return (
    <div
      className={cn(
        'flex cursor-pointer flex-col space-y-1.5 rounded-xl border border-neutral-03 p-6 hover:border-black hover:bg-neutral-02',
        isClicked && selected,
      )}
      onClick={() => handleSelect(content)}
    >
      {AMENITY_LIST[content].icon}
      <span className="whitespace-nowrap text-lg">{AMENITY_LIST[content].name}</span>
    </div>
  );
}
