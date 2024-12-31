import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({ region: process.env.AWS_REGION ?? 'ap-northeast-2' });

const TOPIC_ARNS = {
  email: process.env.EMAIL_TOPIC_ARN,
  push: process.env.PUSH_TOPIC_ARN,
  sms: process.env.SMS_TOPIC_ARN,
};

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

export async function sendNotification(props: NotificationProps) {
  const commands = [];

  if (props.email) {
    commands.push(
      new PublishCommand({
        TopicArn: TOPIC_ARNS.email,
        Message: JSON.stringify({
          type: 'EMAIL',
          email: props.email.to,
          subject: props.email.subject,
          body: props.email.content,
        }),
      }),
    );
  }

  if (props.push) {
    commands.push(
      new PublishCommand({
        TopicArn: TOPIC_ARNS.push,
        Message: JSON.stringify({
          type: 'PUSH',
          deviceToken: props.push.token,
          notification: {
            title: props.push.title,
            body: props.push.body,
          },
        }),
      }),
    );
  }

  if (props.sms) {
    commands.push(
      new PublishCommand({
        TopicArn: TOPIC_ARNS.sms,
        Message: JSON.stringify({
          type: 'SMS',
          phoneNumber: props.sms.phoneNumber,
          message: props.sms.message,
        }),
      }),
    );
  }

  try {
    const responses = await Promise.all(commands.map((command) => snsClient.send(command)));
    console.debug(
      'Notifications sent successfully:',
      responses.map((r) => r.MessageId),
    );
    return responses;
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw error;
  }
}
