import { KakaoPayCreate, NaverPayCreate, TossPaymentCreate } from '@/schemas/payment';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({ region: process.env.AWS_REGION ?? 'ap-northeast-2' });

interface PaymentCreateRetry extends TossPaymentCreate, KakaoPayCreate, NaverPayCreate {
  idempotentKey: string;
}

export async function sendToRetryQueue(retry: PaymentCreateRetry) {
  const command = new SendMessageCommand({
    QueueUrl: process.env.PAYMENT_RETRY_QUEUE_URL,
    MessageBody: JSON.stringify(retry),
  });

  try {
    await sqsClient.send(command);
    console.debug('Successfully sent retry message');
  } catch (error) {
    console.error('Failed to send retry message: ', error);
  }
}
