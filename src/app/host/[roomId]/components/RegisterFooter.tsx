import Link from 'next/link';

// TODO: 클라이언트 컴포넌트로 useActionState 사용
export default function RegisterFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex h-24 items-center justify-center border-t border-neutral-04 bg-white">
      <div className="flex w-full flex-row items-center justify-between px-20">
        <Link
          href={'..'}
          className="border-b border-black text-xl"
        >
          뒤로
        </Link>
        <button
          className="rounded-xl bg-black px-8 py-3 text-xl text-white"
          type="submit"
        >
          다음
        </button>
      </div>
    </div>
  );
}
