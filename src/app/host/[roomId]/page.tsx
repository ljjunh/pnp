import Image from 'next/image';

export default async function RegisterPage() {
  return (
    <div className="grid h-full w-full grid-cols-2 items-center justify-center">
      <input
        type="hidden"
        name="step"
        value="start"
      />
      <span className="grid-cols-1 text-6xl font-semibold">
        간단하게 에어비앤비
        <br /> 호스팅을 시작할 수<br /> 있습니다.
      </span>
      <div className="flex grid-cols-1 flex-col space-y-8">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-row space-x-5">
            <span className="text-2xl font-semibold">1</span>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold">숙소 정보를 알려주세요</span>
              <span className="flex-1 text-xl text-neutral-07">
                숙소 위치와 숙박 가능 인원 등 기본 정보를 알려주세요.
              </span>
            </div>
          </div>
          <Image
            src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
            alt="1"
            width={120}
            height={120}
          />
        </div>
        <hr />
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-row space-x-5">
            <span className="text-2xl font-semibold">2</span>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold">숙소를 돋보이게 하세요</span>
              <span className="flex-1 text-xl text-neutral-07">
                사진을 5장 이상 제출하고 제목과 설명을 추가해주시면 숙소가 돋보일 수 있도록
                도와드릴게요.
              </span>
            </div>
          </div>
          <Image
            src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
            alt="2"
            width={120}
            height={120}
          />
        </div>
        <hr />
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-row space-x-5">
            <span className="text-2xl font-semibold">3</span>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold">등록을 완료하세요</span>
              <span className="flex-1 text-xl text-neutral-07">
                호스팅 초기에 적용할 요금을 설정하고, 세부정보를 인증한 다음 숙소 등록을 완료하세요.
              </span>
            </div>
          </div>
          <Image
            src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
            alt="3"
            width={120}
            height={120}
          />
        </div>
      </div>
    </div>
  );
}
