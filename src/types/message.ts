export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  LOCATION = 'LOCATION',
  SYSTEM_COMMAND = 'SYSTEM_COMMAND',
  REACTION = 'REACTION',
}

export interface Message {
  roomId: string;
  timestamp: number;

  senderId: string;
  receiverId: string;

  type: MessageType;
  content: {
    text?: string;
    mediaUrl?: string;
    fileSize?: number;
    fileMimeType?: string;
  };

  metadata?: {
    location?: {
      latitude: number;
      longitude: number;
    };
    duration?: number;
    thumbnailUrl?: string;
  };

  isEncrypted: boolean;
  encryptionKey?: string;

  createdAt: Date;
  updatedAt: Date;
}
