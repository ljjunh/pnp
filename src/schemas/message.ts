import { z } from 'zod';
import { MessageType } from '@/types/message';

const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

const contentSchema = z.object({
  text: z.string().optional(),
  mediaUrl: z.string().url().optional(),
  fileSize: z.number().optional(),
  fileMimeType: z.string().optional(),
});

const metadataSchema = z.object({
  location: locationSchema.optional(),
  duration: z.number().optional(),
  thumbnailUrl: z.string().url().optional(),
});

export const messageSchema = z
  .object({
    roomId: z.string({
      required_error: 'roomId 값은 필수입니다.',
    }),
    senderId: z.string({
      required_error: 'senderId 값은 필수입니다.',
    }),
    receiverId: z.string({
      required_error: 'receiverId 값은 필수입니다.',
    }),
    type: z.nativeEnum(MessageType),
    content: contentSchema,
    metadata: metadataSchema.optional(),
    encryptionKey: z.string().optional(),
  })
  .refine(
    (data) => {
      switch (data.type) {
        case MessageType.TEXT:
          return !!data.content.text;
        case MessageType.IMAGE:
          return !!data.content.fileSize && !!data.content.fileMimeType;
        case MessageType.LOCATION:
          return !!data.metadata?.location;
        default:
          return true;
      }
    },
    { message: 'Invalid message content for the specified type' },
  );
