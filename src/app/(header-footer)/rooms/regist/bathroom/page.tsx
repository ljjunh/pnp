import Link from 'next/link';

export default function Bathroom() {
  return (
    <div className="py-11">
      <p className="pb-11 text-3xl">게스트가 사용하게 될 욕실은 <br />어떤 유형인가요?</p>
      <div className="fixed bottom-0 left-0 right-0 flex h-20 items-center justify-center border-t border-neutral-04 bg-white">
        <div className="flex w-full flex-row items-center justify-between px-20">
          <Link
            href={'..'}
            className="border-b border-black text-base"
          >
            뒤로
          </Link>
          <button className="rounded-xl bg-black px-8 py-3 text-white">다음</button>
        </div>
      </div>
    </div>
  );
}
