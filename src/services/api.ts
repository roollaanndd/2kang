const BASE_URL = import.meta.env.VITE_API_URL || '';
const API_PREFIX = '/api/v1';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  perPage: number;
}

function getToken(): string | null {
  return localStorage.getItem('omdc_token') || localStorage.getItem('omdc_admin_token');
}

export function setToken(token: string, type: 'patient' | 'admin' = 'patient') {
  localStorage.setItem(type === 'admin' ? 'omdc_admin_token' : 'omdc_token', token);
}

export function clearToken() {
  localStorage.removeItem('omdc_token');
  localStorage.removeItem('omdc_admin_token');
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  try {
    const url = `${BASE_URL}${API_PREFIX}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(err.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data && typeof data === 'object' && 'success' in data) {
      return data;
    }
    return { data, success: true };
  } catch (error) {
    if (!BASE_URL) {
      return { data: null as T, success: false, error: 'No API URL configured — using mock data' };
    }
    throw error;
  }
}

export const api = {
  get: <T>(url: string) => request<T>(url, { method: 'GET' }),
  post: <T>(url: string, body?: unknown) => request<T>(url, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(url: string, body: unknown) => request<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(url: string, body?: unknown) => request<T>(url, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(url: string) => request<T>(url, { method: 'DELETE' }),
};
