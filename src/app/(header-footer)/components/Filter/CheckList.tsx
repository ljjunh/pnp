import { useState } from 'react';
import { IoSquareOutline } from 'react-icons/io5';
import { MdCheckBox } from 'react-icons/md';

interface CheckListProps {
  title: string;
}

export default function CheckList({ title }: CheckListProps) {
  const [check, setCheck] = useState<boolean>(false);

  return (
    <div
      className="flex cursor-pointer items-center justify-between"
      onClick={() => setCheck(!check)}
      data-testid="check-list"
    >
      <span>{title}</span>
      {check ? (
        <MdCheckBox
          size={28}
          data-testid="check"
        />
      ) : (
        <IoSquareOutline
          size={28}
          color="LightGray"
          data-testid="uncheck"
        />
      )}
    </div>
  );
}
