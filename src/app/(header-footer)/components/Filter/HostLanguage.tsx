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
  const [hostLanguage, setHostLanguage] = useState<number[]>(language);
  const [open, setOpen] = useState<boolean>(false);

  const handleLanguage = (language: number) => {
    const newLanguage = hostLanguage.includes(language)
      ? hostLanguage.filter((prevLanguage) => prevLanguage !== language)
      : [...hostLanguage, language];

    setHostLanguage(newLanguage);
    handleFilter(newLanguage, 'language');
  };

  return (
    <div className="space-y-6 px-6 py-8">
      <div
        className="flex cursor-pointer items-center justify-between pb-4"
        onClick={() => setOpen(!open)}
        data-testid="host-language"
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
