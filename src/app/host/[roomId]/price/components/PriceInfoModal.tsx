import PriceModalCloseButton from '@/app/host/[roomId]/price/components/PriceModalCloseButton';

export default function PriceInfoModal() {
  return (
    <div className="w-[700px] p-6">
      <div className="relative flex items-center justify-center">
        <PriceModalCloseButton />
        <span className="pb-4 text-lg font-semibold">제안 요금에 관한 자세한 정보</span>
      </div>
      <hr />
      <div className="mt-4 space-y-4">
        <span className="text-lg">
          호스트는 요금을 직접 선택하고 언제든지 변경할 수 있습니다. 예약은 보장되지 않습니다.
        </span>
        <div className="flex flex-col space-y-2">
          <span className="text-xl font-semibold">1박당 요금</span>
          <span className="text-lg">
            제안 요금은 숙소 위치, 편의시설, 게스트 수요 및 비슷한 숙소 등의 요인에 기반합니다.
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-xl font-semibold">게스트 요금 세부 정보</span>
          <span className="text-lg">
            요금을 책정하거나 요금 내역을 확인할 때 게스트 서비스 수수료 및/또는 세금(해당하는
            경우)은 예약 세부 정보(숙박 기간, 게스트 인원수 등)에 따라 달라질 수 있습니다.
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-xl font-semibold">비슷한 숙소 비교</span>
          <span className="text-lg">
            {`호스트님 숙소와 비슷한 숙소를 판단할 때는 위치, 숙소 유형, 방 개수, 편의시설, 후기,
            평점, 게스트가 함께 조회하는 숙소 등의 기준을 고려합니다. 또한 현재 운영되지 않는 숙소는
            되도록 포함하지 않습니다. 예를 들어, 지난 1년간 예약이 없었거나 앞으로 예약 가능일이
            없는 숙소는 절대 포함되지 않습니다. 예약되었거나 예약 가능한 숙소의 1박당 평균 요금이
            표시됩니다. 특정 기간을 선택할 경우, 이 기간에 예약된 날과 그렇지 않은 날이 모두 있는
            숙소는 지도에서 '예약됨'과 '예약되지 않음'으로 모두 표시될 수 있습니다.`}
          </span>
        </div>
      </div>
    </div>
  );
}
