export default function Safety() {
  // 보안카메라 10
  // 소음 측정기 690
  return (
    <div className="flex h-full w-full flex-col items-start justify-center space-y-6 px-80">
      <p className="text-3xl font-semibold">안전 관련 정보 공유하기</p>
      <span className="text-xl font-semibold">숙소에 다음 사항이 있나요?</span>
      <div className="flex w-full flex-row justify-between">
        <label
          htmlFor="camera"
          className="cursor-pointer text-lg"
        >
          숙소 실외 공간을 모니터링하는 보안 카메라 있음
        </label>
        <input
          type="checkbox"
          id="camera"
          className="h-6 w-6 cursor-pointer accent-black"
        />
      </div>
      <div className="flex w-full flex-row justify-between">
        <label
          htmlFor="noise"
          className="cursor-pointer text-lg"
        >
          소음 측정기 있음
        </label>
        <input
          type="checkbox"
          id="noise"
          className="h-6 w-6 cursor-pointer accent-black"
        />
      </div>
      <hr className="w-full border-neutral-06" />
      <div className="flex flex-col space-y-2 text-neutral-07">
        <span className="text-xl font-semibold">중요 사항</span>
        <span className="text-lg">
          실내 공간을 모니터링하는 보안 카메라는 전원이 꺼져 있어도 허용되지 않습니다. 실외 공간을
          모니터링하는 보안 카메라는 설치 위치를 모두 공개해야 합니다.
        </span>
        <span className="pt-6 text-lg">
          호스팅하는 지역의 현지 법규를 준수하고 에어비앤비의 차별 금지 정책과 게스트 및 호스트
          수수료에 대해 숙지하세요.
        </span>
      </div>
      <input
        type="hidden"
        name="step"
        value="safety"
      />
    </div>
  );
}
