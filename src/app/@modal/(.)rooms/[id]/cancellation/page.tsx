import Modal from '@/components/common/Modal/Modal';

export default function CancellationModal() {
  return (
    <Modal>
      <section className="mb-6 pt-4">
        <h1 className="mb-4 text-2xl">환불 정책</h1>
        <section>
          <div className="mb-2">
            <div className="flex flex-col border-b py-6">
              <span>전액 환불</span>
              <span className="text-shade-02">결제하신 금액이 100% 환불됩니다.</span>
            </div>
            <div className="flex flex-col border-b py-6">
              <span>부분 환불</span>
              <span className="text-shade-02">
                전체 숙박 요금 중 50%를 환불받으실 수 있습니다. 서비스 수수료는 전액 환불됩니다.
              </span>
            </div>
          </div>
        </section>
        <p className="my-8 text-shade-02">
          체크인 전에 예약을 취소하면 청소비는 언제나 환불됩니다.
        </p>
      </section>
    </Modal>
  );
}
