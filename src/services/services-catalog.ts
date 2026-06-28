import { api } from './api';
import type { Service } from '../types';

export const servicesCatalogService = {
  list: (includeInactive = false) =>
    api.get<Service[]>(`/services${includeInactive ? '?all=true' : ''}`),

  get: (id: string) => api.get<Service>(`/services/${id}`),

  create: (data: Partial<Service>) => api.post<Service>('/services', data),

  update: (id: string, data: Partial<Service>) =>
    api.patch<Service>(`/services/${id}`, data),

  remove: (id: string) => api.delete(`/services/${id}`),

  reorder: (ids: string[]) =>
    api.patch('/services/reorder/batch', { ids }),
};
