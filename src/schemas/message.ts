import { z } from 'zod';
import { MessageType } from '@/types/message';

const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

const metadataSchema = z.object({
  fileSize: z.number().optional(),
  mimeType: z.string().optional(),
  coordinates: coordinatesSchema.optional(),
});

export const messageInputSchema = z
  .object({
    type: z.nativeEnum(MessageType),
    content: z.string().min(1, { message: '내용은 비워둘 수 없습니다' }),
    senderId: z.string({
      required_error: '보낸 사람 ID는 필수입니다',
    }),
    roomId: z.number({
      required_error: '방 ID는 필수입니다',
    }),
    timestamp: z.number().positive(),
    metadata: metadataSchema.optional(),
  })
  .refine(
    (data) => {
      // 타입별 추가 검증 로직
      switch (data.type) {
        case MessageType.IMAGE:
          return !!data.metadata?.mimeType && !!data.metadata?.fileSize;
        case MessageType.LOCATION:
          return !!data.metadata?.coordinates;
        default:
          return true;
      }
    },
    {
      message: '메시지 타입에 따른 메타데이터가 누락되었습니다',
    },
  );

export type MessageInput = z.infer<typeof messageInputSchema>;
