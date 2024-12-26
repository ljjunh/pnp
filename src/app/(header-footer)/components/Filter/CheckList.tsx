import { useState } from 'react';
import { IoSquareOutline } from 'react-icons/io5';
import { MdCheckBox } from 'react-icons/md';

interface CheckListProps {
  id: number;
  title: string;
  handleClick: (title: number) => void;
}

export default function CheckList({ id, title, handleClick }: CheckListProps) {
  const [check, setCheck] = useState<boolean>(false);

  return (
    <div
      className="flex cursor-pointer items-center justify-between"
      onClick={() => {
        setCheck(!check);
        handleClick(id);
      }}
      data-testid="check-list"
      role="check-box"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setCheck(!check);
          handleClick(id);
        }
      }}
    >
      <span>{title}</span>
      {check ? (
        <MdCheckBox
          size={28}
          data-testid="check"
          aria-hidden="true"
        />
      ) : (
        <IoSquareOutline
          size={28}
          color="LightGray"
          data-testid="uncheck"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
