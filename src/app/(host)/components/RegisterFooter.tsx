import { headers } from 'next/headers';
import Link from 'next/link';
import { NextRequest } from 'next/server';

export default function RegisterFooter() {
  // const nowStep = request.nextUrl.pathname;
  const headersList = headers();
  const pathname = headersList.get('x-pathname');

  console.log(pathname)

  // const handleNextStep = () => {
  //   console.log(pathname);
  // };

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
          // onClick={handleNextStep}
        >
          다음
        </button>
      </div>
    </div>
  );
}
