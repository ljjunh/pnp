import { TAG_LIST } from '@/constants/amenity';

interface TagProps {
  tag: string;
  handleClick: (tag: string) => void;
  isChecked: boolean;
}

export default function Tag({ tag, handleClick, isChecked }: TagProps) {
  return (
    <div
      className={`flex w-fit cursor-pointer items-center justify-center space-x-2 rounded-3xl border px-5 py-2.5 hover:border-black ${isChecked ? 'border-black' : 'border-neutral-03'}`}
      onClick={() => handleClick(tag)}
    >
      {TAG_LIST[tag].icon}
      <span className="text-sm">{TAG_LIST[tag].name}</span>
    </div>
  );
}
