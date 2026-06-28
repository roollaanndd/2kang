import { api } from './api';

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone?: string;
  whatsapp?: string;
  hours?: string;
  image?: string;
  isActive: boolean;
  queuePrefix: string;
}

export const branchesService = {
  list: (includeInactive = false) =>
    api.get<Branch[]>(`/branches${includeInactive ? '?all=true' : ''}`),

  get: (id: string) => api.get<Branch>(`/branches/${id}`),

  create: (data: Partial<Branch>) => api.post<Branch>('/branches', data),

  update: (id: string, data: Partial<Branch>) =>
    api.patch<Branch>(`/branches/${id}`, data),

  remove: (id: string) => api.delete(`/branches/${id}`),

  resetQueue: (id: string) => api.post(`/branches/${id}/reset-queue`),
};
