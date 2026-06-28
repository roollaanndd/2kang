import { api } from './api';

export interface Notification {
  id: string;
  userId?: string;
  type: 'reminder' | 'queue' | 'promo' | 'system';
  title: string;
  body: string;
  read: boolean;
  isBroadcast: boolean;
  createdAt: string;
}

export const notificationsService = {
  list: () => api.get<Notification[]>('/notifications'),

  unreadCount: () => api.get<number>('/notifications/unread-count'),

  markRead: (id: string) => api.patch(`/notifications/${id}/read`),

  markAllRead: () => api.patch('/notifications/read-all'),

  broadcast: (data: { type: string; title: string; body: string; branchId?: string }) =>
    api.post('/notifications/broadcast', data),
};
