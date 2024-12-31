import { KakaoPayCreate, NaverPayCreate, TossPaymentCreate } from '@/schemas/payment';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({ region: process.env.AWS_REGION ?? 'ap-northeast-2' });

const QUEUE_URLS = {
  email: process.env.EMAIL_QUEUE_URL,
  push: process.env.PUSH_QUEUE_URL,
  sms: process.env.SMS_QUEUE_URL,
};

type PaymentCreateRetry = (TossPaymentCreate | KakaoPayCreate | NaverPayCreate) & {
  idempotentKey: string;
};

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

interface NotificationProps {
  userId: string;
  email?: {
    to: string;
    subject: string;
    content: string;
  };
  push?: {
    token: string;
    title: string;
    body: string;
  };
  sms?: {
    phoneNumber: string;
    message: string;
  };
}

/**
 * 특정한 알람을 보내게 된다면 해당 함수를 사용합니다.
 *
 * @param {NotificationProps} props 알람을 보내기 위한 정보
 */
export async function sendToNotificationQueue(props: NotificationProps) {
  const commands = Object.entries(props)
    .filter(([key, value]) => {
      return key !== 'userId' && value;
    })
    .map(([key, value]) => {
      return new SendMessageCommand({
        QueueUrl: QUEUE_URLS[key as keyof typeof QUEUE_URLS],
        MessageBody: JSON.stringify(value),
      });
    });

  try {
    await Promise.all(commands.map((command) => sqsClient.send(command)));
    console.debug('Successfully sent notification message');
  } catch (error) {
    console.error('Failed to send notification message: ', error);
  }
}
