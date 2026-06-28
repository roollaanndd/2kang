import { api } from './api';

export interface CmsContent {
  id: string;
  section: string;
  key: string;
  value: any;
  branchId?: string;
  language: 'id' | 'en';
  isActive: boolean;
  sortOrder: number;
}

export interface Promotion {
  id: string;
  title: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  image?: string;
  badge?: string;
  discountPercent?: number;
  validUntil?: string;
  terms?: string;
  color?: string;
  isActive: boolean;
  sortOrder: number;
  branchId?: string;
}

export const cmsService = {
  getSection: (section: string, lang?: string, branchId?: string) => {
    const params = new URLSearchParams();
    if (lang) params.set('lang', lang);
    if (branchId) params.set('branchId', branchId);
    const qs = params.toString();
    return api.get<CmsContent[]>(`/cms/content/${section}${qs ? `?${qs}` : ''}`);
  },

  upsertContent: (data: { section: string; key: string; value: any; language?: string; branchId?: string }) =>
    api.post<CmsContent>('/cms/content', data),

  deleteContent: (id: string) => api.delete(`/cms/content/${id}`),

  getKioskSettings: (branchId?: string) =>
    api.get<Record<string, any>>(`/cms/kiosk-settings${branchId ? `?branchId=${branchId}` : ''}`),

  updateKioskSetting: (key: string, value: any, branchId?: string) =>
    api.patch(`/cms/kiosk-settings/${key}`, { value, branchId }),

  getPromotions: (branchId?: string) =>
    api.get<Promotion[]>(`/cms/promotions${branchId ? `?branchId=${branchId}` : ''}`),

  createPromotion: (data: Partial<Promotion>) =>
    api.post<Promotion>('/cms/promotions', data),

  updatePromotion: (id: string, data: Partial<Promotion>) =>
    api.patch<Promotion>(`/cms/promotions/${id}`, data),

  deletePromotion: (id: string) => api.delete(`/cms/promotions/${id}`),
};
