import { dynamoDB } from '@/lib/server';
import { MessageInput } from '@/schemas';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = 'Messages';

/**
 * 사용자가 입력한 메시지를 저장합니다.
 *
 * @param {MessageInput} messageInput 사용자가 입력한 메시지
 */
export async function saveMessage(messageInput: MessageInput) {
  const messageItem = {
    PK: { S: `ROOM#${messageInput.roomId}` },
    SK: { S: `MESSAGE#${Date.now()}#${uuidv4()}` },
    Type: { S: messageInput.type },
    Content: { S: messageInput.content },
    SenderId: { S: messageInput.senderId },
    Timestamp: { N: Date.now().toString() },
    Metadata: {
      M: messageInput.metadata
        ? {
            fileSize: { N: messageInput.metadata.fileSize?.toString() || '0' },
            mimeType: { S: messageInput.metadata.mimeType || '' },
            latitude: { N: messageInput.metadata.coordinates?.latitude.toString() || '0' },
            longitude: { N: messageInput.metadata.coordinates?.longitude.toString() || '0' },
          }
        : {
            fileSize: { N: '0' },
            mimeType: { S: '' },
            latitude: { N: '0' },
            longitude: { N: '0' },
          },
    },
  };
  await dynamoDB.send(
    new PutItemCommand({
      TableName: TABLE_NAME,
      Item: messageItem,
    }),
  );
}
