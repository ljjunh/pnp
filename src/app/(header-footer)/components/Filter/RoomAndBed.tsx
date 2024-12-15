import { useState } from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

export default function RoomAndBed() {
  const [bedRoom, setBedRoom] = useState<string | number>('상관없음');
  const [bed, setBed] = useState<string | number>('상관없음');
  const [bathRoom, setBathRoom] = useState<string | number>('상관없음');

  return (
    <div className="px-6 py-8">
      <div className="pb-4">
        <span className="text-lg font-semibold">침실과 침대</span>
      </div>
      <div className="space-y-4">
        <div className="flex flex-row items-center justify-between">
          <span>침실</span>
          <div className="flex w-40 flex-row items-center justify-between">
            <CiCircleMinus
              size={36}
              color={bedRoom === '상관없음' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                setBedRoom((prev) => {
                  if (prev === '상관없음') return prev;
                  if (prev === 1) return '상관없음';
                  if (prev === '8+') return 7;
                  return Number(prev) - 1;
                });
              }}
            />
            <p className="px-4">{bedRoom}</p>
            <CiCirclePlus
              size={36}
              color={bedRoom === '8+' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                setBedRoom((prev) => {
                  if (prev === '상관없음') return 1;
                  if (prev === 7) return '8+';
                  if (prev === '8+') return prev;
                  return Number(prev) + 1;
                });
              }}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span>침대</span>
          <div className="flex w-40 flex-row items-center justify-between">
            <CiCircleMinus
              size={36}
              color={bed === '상관없음' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                setBed((prev) => {
                  if (prev === '상관없음') return prev;
                  if (prev === 1) return '상관없음';
                  if (prev === '8+') return 7;
                  return Number(prev) - 1;
                });
              }}
            />
            <p className="px-4">{bed}</p>
            <CiCirclePlus
              size={36}
              color={bed === '8+' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                setBed((prev) => {
                  if (prev === '상관없음') return 1;
                  if (prev === 7) return '8+';
                  if (prev === '8+') return prev;
                  return Number(prev) + 1;
                });
              }}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span>욕실</span>
          <div className="flex w-40 flex-row items-center justify-between">
            <CiCircleMinus
              size={36}
              color={bathRoom === '상관없음' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                setBathRoom((prev) => {
                  if (prev === '상관없음') return prev;
                  if (prev === 1) return '상관없음';
                  if (prev === '8+') return 7;
                  return Number(prev) - 1;
                });
              }}
            />
            <p className="px-4">{bathRoom}</p>
            <CiCirclePlus
              size={36}
              color={bathRoom === '8+' ? 'LightGray' : 'Gray'}
              className="cursor-pointer"
              onClick={() => {
                setBathRoom((prev) => {
                  if (prev === '상관없음') return 1;
                  if (prev === 7) return '8+';
                  if (prev === '8+') return prev;
                  return Number(prev) + 1;
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
