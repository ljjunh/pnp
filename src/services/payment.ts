import { ServerError } from '@/errors/errors';
import { prisma } from '@/lib/server';
import { PaymentConfirm } from '@/schemas/payment';
import { PortOneClient, PortOneError } from '@portone/server-sdk';

const portone = PortOneClient({
  secret: process.env.PORTONE_SECRET!,
});

/**
 * 결제 승인 요청을 처리합니다. (토스, 카카오페이, 네이버페이)
 * 만약, 결제 승인 요청에 실패하면 재시도 큐에 메시지를 전송합니다.
 *
 * @param userId 사용자 식별자
 * @param data
 */
export async function confirmPayment(userId: string, data: PaymentConfirm) {
  try {
    const payment = await portone.payment.getPayment({
      paymentId: data.paymentId,
    });

    if (payment.status !== 'PAID') {
      console.error('결제에 실패하였습니다', {
        userId,
        paymentId: data.paymentId,
        status: payment.status,
      });

      throw new ServerError('결제에 실패하였습니다');
    }

    return await prisma.$transaction(async (prisma) => {
      const reservation = await prisma.reservation.update({
        where: {
          orderNumber: payment.id,
          userId,
        },
        data: {
          status: 'PAYMENT',
        },
      });

      if (!reservation) {
        throw new ServerError('예약 정보를 찾을 수 없습니다.');
      }

      // 신규 결제 정보 생성
      return await prisma.payment.create({
        data: {
          orderNumber: payment.id,
          userId,
          transactionId: payment.transactionId,
          orderName: payment.orderName,
          method: String(payment.method?.type || 'UNKNOWN'),
          amount: payment.amount.total,
          vat: payment.amount.vat,
          paid: payment.amount.paid,
          receiptUrl: payment.receiptUrl,
          status: payment.status,
          currency: payment.currency,
          paidAt: payment.paidAt,
          statusUpdatedAt: payment.statusChangedAt,
        },
      });
    });
  } catch (error) {
    if (error instanceof PortOneError) {
      console.error('포트원 결제 연동 시 오류 발생', {
        userId,
        paymentId: data.paymentId,
        error: error.message,
      });
    }
  }
}
