import Image from 'next/image';
import RegisterQuestion from '@/app/host/[roomId]/components/RegisterQuestion';
import RegisterSave from '@/app/host/[roomId]/components/RegisterSave';

export default function RegisterHeader() {
  return (
    <div
      role="banner"
      className="fixed top-0 z-10 flex h-[78px] w-full items-center justify-between border-b bg-shade-01 px-16 py-4"
    >
      <Image
        src="/images/registerLogo.svg"
        width="32"
        height="32"
        alt="register logo"
      />
      <div className="flex space-x-4">
        <RegisterQuestion />
        <RegisterSave />
      </div>
    </div>
  );
}
