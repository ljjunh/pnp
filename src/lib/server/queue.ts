import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({ region: process.env.AWS_REGION ?? 'ap-northeast-2' });

export async function sendToRetryQueue(retry: unknown) {
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
