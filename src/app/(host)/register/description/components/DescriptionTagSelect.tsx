import { useState } from 'react';
import { cn } from '@/lib/utils';

const descriptions = [
  '평화로움',
  '독특함',
  '가족이 지내기에 적합',
  '세련됨',
  '중심부에 위치',
  '넓은 공간',
];

export default function DescriptionTagSelect() {
  const [checkList, setCheckList] = useState<string[]>([]);

  const handleClick = (description: string) => {
    if (checkList.includes(description)) {
      setCheckList(checkList.filter((item) => item !== description));
    } else {
      if (checkList.length >= 2) {
        setCheckList([checkList[1], description]);
      } else {
        setCheckList([...checkList, description]);
      }
    }
  };

  return (
    <>
      <p className="mb-4 text-3xl font-semibold">이제 주택에 대해 설⁠명⁠해⁠주⁠세⁠요</p>
      <span className="text-lg text-neutral-07">
        숙소의 특징이 잘 드러나는 문구를 최대 2개까지 선택하실 수 있습니다. 선택한 문구로 숙소
        설명을 작성하실 수 있도록 도와드릴게요.
      </span>
      <div className="mt-4 flex flex-wrap gap-4">
        {descriptions.map((description, index) => {
          return (
            <div
              className={cn(
                'flex w-fit cursor-pointer items-center justify-center space-x-2 rounded-3xl border-2 px-5 py-2.5 hover:border-black',
                checkList.includes(description) ? 'border-black' : 'border-neutral-03',
              )}
              onClick={() => handleClick(description)}
              key={`${description}-${index}`}
            >
              <span className="text-sm">{description}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
