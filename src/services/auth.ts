import { api, setToken, clearToken } from './api';

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  dob?: string;
  gender?: 'M' | 'F';
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo?: string;
    memberCode: string;
    medicalRecordNo: string;
  };
}

export interface AdminLoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
    role: string;
  };
}

export const authService = {
  register: (data: RegisterData) => api.post<{ id: string; memberCode: string }>('/auth/register', data),

  login: async (identity: string, password: string) => {
    const res = await api.post<LoginResponse>('/auth/login', { identity, password });
    if (res.success && res.data?.token) {
      setToken(res.data.token, 'patient');
    }
    return res;
  },

  adminLogin: async (username: string, password: string) => {
    const res = await api.post<AdminLoginResponse>('/auth/admin/login', { username, password });
    if (res.success && res.data?.token) {
      setToken(res.data.token, 'admin');
    }
    return res;
  },

  setPin: (pin: string) => api.post('/auth/pin', { pin }),

  logout: () => {
    clearToken();
  },
};
