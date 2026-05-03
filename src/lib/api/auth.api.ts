import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';
import type { User, AuthResponse, LoginData, RegisterData } from './types';

export const authApi = {
  register: (data: RegisterData) =>
    apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data),

  login: (data: LoginData) =>
    apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data),

  logout: () => {
    const refreshToken = localStorage.getItem('terravest_refresh_token');
    return apiClient.post(ENDPOINTS.AUTH.LOGOUT, { refreshToken });
  },

  getMe: () => apiClient.get<{ user: User }>(ENDPOINTS.AUTH.ME),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiClient.post<{ message: string }>(ENDPOINTS.AUTH.CHANGE_PASSWORD, data),
};
