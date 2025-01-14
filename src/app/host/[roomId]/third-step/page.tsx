export default function ThirdStep() {
  return (
    <div className="flex flex-row items-center justify-between pt-24">
      <div className="flex flex-col justify-start space-y-6">
        <span className="text-xl font-semibold">3단계</span>
        <span className="text-6xl font-semibold">등록을 완료하세요</span>
        <span className="text-xl">
          마지막 단계에서는 첫 예약에서 에어비앤비 이용 경험이 풍부한 게스트를 맞이할지 여부를
          선택하고 1박 요금을 설정하실 수 있습니다. 몇 가지 간단한 질문에 답하고 난 후 준비가 되면
          숙소 등록을 완료하세요.
        </span>
      </div>
      <video
        preload="auto"
        autoPlay
        muted
        className="h-3/5 w-3/5 object-cover"
        aria-label="숙소 등록 3단계 소개 영상"
      >
        <source
          src="https://stream.media.muscache.com/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4?v_q=high"
          type="video/mp4"
        />
      </video>
      <input
        type="hidden"
        name="step"
        value="third"
      />
    </div>
  );
}
