import { useState } from 'react';
import CheckList from '@/app/(header-footer)/components/filter/CheckList';
import { FilterType } from '@/schemas/rooms';
import { LANGUAGE } from '@/constants/language';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface HostLanguageProps {
  language: number[];
  handleFilter: (newState: number[], type: keyof FilterType) => void;
}

export default function HostLanguage({ language, handleFilter }: HostLanguageProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleLanguage = (nowLanguage: number) => {
    const newLanguage = language.includes(nowLanguage)
      ? language.filter((prevLanguage) => prevLanguage !== nowLanguage)
      : [...language, nowLanguage];

    handleFilter(newLanguage, 'language');
  };

  return (
    <div className="space-y-6 px-6 py-8">
      <div
        className="flex cursor-pointer items-center justify-between pb-4"
        onClick={() => setOpen(!open)}
        role="button"
      >
        <span className="text-lg font-semibold">호스트 언어</span>
        {open ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
      </div>
      {open && (
        <div className="space-y-4">
          {LANGUAGE.map((language, index) => (
            <CheckList
              id={language.id}
              title={language.content}
              handleClick={handleLanguage}
              key={`${index}-${language.content}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
