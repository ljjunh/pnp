import { useEffect, useState } from 'react';

export default function KindOfRoom() {
  const [kindRoom, setKindRoom] = useState<string>('');

  const hoverStyle = 'hover:rounded-lg hover:border-none hover:bg-neutral-01';
  const selectStyle = 'rounded-lg border-2 border-black bg-neutral-01';

  useEffect(() => {
    console.log(kindRoom);
  }, [kindRoom]);

  return (
    <div className="px-6 py-8">
      <div className="pb-4">
        <span className="text-lg font-semibold">숙소 유형</span>
      </div>
      <div className="h-12 w-full">
        <div className="grid h-full grid-cols-3 rounded-xl border border-neutral-03 p-1">
          <div
            className={`${hoverStyle} flex cursor-pointer items-center justify-center border-r border-neutral-03 ${kindRoom === '모든 유형' && selectStyle}`}
            onClick={() => setKindRoom('모든 유형')}
          >
            <span className="text-sm">모든 유형</span>
          </div>
          <div
            className={`${hoverStyle} flex cursor-pointer items-center justify-center border-r border-neutral-03 ${kindRoom === '방' && selectStyle}`}
            onClick={() => setKindRoom('방')}
          >
            <span className="text-sm">방</span>
          </div>
          <div
            className={`${hoverStyle} flex cursor-pointer items-center justify-center ${kindRoom === '집 전체' && selectStyle}`}
            onClick={() => setKindRoom('집 전체')}
          >
            <span className="text-sm">집 전체</span>
          </div>
        </div>
      </div>
    </div>
  );
}
