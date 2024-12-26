export type ActionResponse<T = void> = {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
};
