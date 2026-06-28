import { api } from './api';

export const integrationService = {
  list: () => api.get('/integration'),
  get: (id: string) => api.get(`/integration/${id}`),
  create: (data: {
    name: string;
    type: string;
    baseUrl: string;
    apiKey?: string;
    apiSecret?: string;
    authMethod?: string;
    headers?: Record<string, string>;
    fieldMapping?: Record<string, string>;
    settings?: Record<string, any>;
  }) => api.post('/integration', data),
  update: (id: string, data: Record<string, any>) => api.patch(`/integration/${id}`, data),
  remove: (id: string) => api.delete(`/integration/${id}`),
  testConnection: (id: string) => api.post(`/integration/${id}/test`),

  importPatients: (data: { integrationId: string; since?: string; batchSize?: number }) =>
    api.post('/integration/import/patients', data),
  importMedicalRecords: (data: { integrationId: string; patientExternalId?: string; since?: string }) =>
    api.post('/integration/import/medical-records', data),
  exportData: (data: { integrationId: string; entity: string; from?: string; to?: string }) =>
    api.post('/integration/export', data),
  getSyncLogs: (integrationId?: string, limit?: number) => {
    const params = new URLSearchParams();
    if (integrationId) params.set('integrationId', integrationId);
    if (limit) params.set('limit', String(limit));
    const qs = params.toString();
    return api.get(`/integration/sync/logs${qs ? `?${qs}` : ''}`);
  },
};
