import { api } from './api';
import type { Doctor } from '../types';

export interface DoctorAvailability {
  doctorId: string;
  date: string;
  schedule: string[];
  available: boolean;
}

export const doctorsService = {
  list: (branchId?: string) =>
    api.get<Doctor[]>(`/doctors${branchId ? `?branchId=${branchId}` : ''}`),

  get: (id: string) => api.get<Doctor>(`/doctors/${id}`),

  getAvailability: (id: string, date: string) =>
    api.get<DoctorAvailability>(`/doctors/${id}/availability/${date}`),

  update: (id: string, data: Partial<Doctor>) =>
    api.patch<Doctor>(`/doctors/${id}`, data),

  setSchedule: (id: string, schedule: string[]) =>
    api.patch(`/doctors/${id}/schedule`, { schedule }),
};
