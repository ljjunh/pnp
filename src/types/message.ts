import { IconType } from 'react-icons';

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  LOCATION = 'LOCATION',
  SYSTEM_COMMAND = 'SYSTEM_COMMAND',
  REACTION = 'REACTION',
}

export interface FilterItem {
  id: number;
  label: string;
  icon: IconType;
}
