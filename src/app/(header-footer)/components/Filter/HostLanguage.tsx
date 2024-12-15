import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CheckList from './CheckList';

export default function HostLanguage() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="space-y-6 px-6 py-8">
      <div
        className="flex cursor-pointer items-center justify-between pb-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-lg font-semibold">호스트 언어</span>
        {open ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
      </div>
      {open && (
        <div className="space-y-4">
          <CheckList title="중국어" />
          <CheckList title="영어" />
          <CheckList title="프랑스어" />
          <CheckList title="일본어" />
          <CheckList title="한국어" />
          <CheckList title="아랍어" />
          <CheckList title="인도네시아어" />
        </div>
      )}
    </div>
  );
}
