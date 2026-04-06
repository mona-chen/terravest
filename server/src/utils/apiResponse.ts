export type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: 'success' | 'error';
};

export const success = <T>(data: T): ApiResponse<T> => ({ status: 'success', data });
export const failure = (error: string): ApiResponse<null> => ({ status: 'error', error } as any);
