import { FaUserCircle } from 'react-icons/fa';

export function HostInformation() {
  return (
    <div className="flex flex-col gap-5 px-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">호스트: 호스트 이름</h2>
        <FaUserCircle
          size={52}
          className="text-gray-500"
        />
      </div>
      <p className="cursor-pointer underline">더 보기</p>
    </div>
  );
}
