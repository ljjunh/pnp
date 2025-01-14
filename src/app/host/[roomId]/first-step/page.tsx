export default function FirstStep() {
  return (
    <div className="flex flex-row items-center justify-between pt-24">
      <input
        type="hidden"
        name="step"
        value="first"
      />
      <div className="flex flex-col justify-start space-y-6">
        <span className="text-xl font-semibold">1단계</span>
        <span className="text-6xl font-semibold">숙소 정보를 알려주세요</span>
        <span className="text-xl">
          먼저 숙소 유형을 선택하고, 게스트가 예약할 수 있는 숙소가 공간 전체인지 개인실 또는
          다인실인지 알려주세요. 그런 다음 숙소 위치와 수용 가능 인원을 알려주세요.
        </span>
      </div>
      <video
        preload="auto"
        autoPlay
        muted
        className="h-3/5 w-3/5 object-cover"
      >
        <source src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high" />
      </video>
    </div>
  );
}
