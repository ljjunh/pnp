interface CalculatePriceRequest {
  /** 1박당 가격 */
  price: number;
  /** 숙박 일수 */
  nights: number;
  /** 서비스 수수료 비율(%) */
  serviceFeePercentage?: number;
}

interface CalculatePriceResponse {
  /** 숙박 비용 총액 */
  subtotal: number;
  /** 서비스 수수료 */
  serviceFee: number;
  /** 최종 결제 금액 */
  total: number;
}

/**
 * 숙박 요금 계산
 * @param price - 1박당 가격
 * @param nights - 숙박 일수
 * @param serviceFeePercentage - 서비스 수수료 비율(기본값: 10%)
 * @returns 숙박 기본 요금 (가격 * 숙박일), 서비스 수수료 (기본 요금 * 수수료율), 총 결제 금액 (기본 요금 + 서비스 수수료)
 */
export const calculatePrice = ({
  price,
  nights,
  serviceFeePercentage = 10,
}: CalculatePriceRequest): CalculatePriceResponse => {
  const subtotal = price * nights;
  const serviceFee = Math.round(subtotal * (serviceFeePercentage / 100));

  return { subtotal, serviceFee, total: subtotal + serviceFee };
};
