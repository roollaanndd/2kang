import { api } from './api';
import type { Doctor } from '../types';

export interface DoctorAvailability {
  doctorId: string;
  date: string;
  slots: { time: string; booked: boolean }[];
}

export const doctorsService = {
  list: () => api.get<Doctor[]>('/api/doctors'),
  get: (id: string) => api.get<Doctor>(`/api/doctors/${id}`),
  update: (id: string, data: Partial<Doctor>) => api.put<Doctor>(`/api/doctors/${id}`, data),
  getAvailability: (id: string, date: string) =>
    api.get<DoctorAvailability>(`/api/doctors/${id}/availability?date=${date}`),
  setSchedule: (id: string, schedule: string[]) =>
    api.put(`/api/doctors/${id}/schedule`, { schedule }),
};
