import {
  BaseIntegrationAdapter,
  PatientRecord,
  MedicalRecord,
  AppointmentRecord,
  ConnectionTestResult,
} from './base.adapter';

export class RestApiAdapter extends BaseIntegrationAdapter {
  async testConnection(): Promise<ConnectionTestResult> {
    try {
      const response = await fetch(`${this.config.baseUrl}/health`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json().catch(() => ({}));
      return {
        success: true,
        message: 'Connected successfully',
        serverVersion: data.version,
        capabilities: data.capabilities,
      };
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${(error as Error).message}`,
      };
    }
  }

  async fetchPatients(since?: string, limit = 100): Promise<PatientRecord[]> {
    const params = new URLSearchParams();
    if (since) params.set('modified_after', since);
    params.set('limit', String(limit));

    const endpoint = this.config.settings?.patientsEndpoint || '/patients';
    const response = await this.request(`${endpoint}?${params}`);
    const data = await response.json();

    const records = Array.isArray(data) ? data : data.data || data.patients || [];
    return records.map((r: Record<string, any>) => this.mapFields(r, 'inbound') as PatientRecord);
  }

  async fetchMedicalRecords(patientExternalId?: string, since?: string): Promise<MedicalRecord[]> {
    const params = new URLSearchParams();
    if (patientExternalId) params.set('patient_id', patientExternalId);
    if (since) params.set('modified_after', since);

    const endpoint = this.config.settings?.medicalRecordsEndpoint || '/medical-records';
    const response = await this.request(`${endpoint}?${params}`);
    const data = await response.json();

    const records = Array.isArray(data) ? data : data.data || data.records || [];
    return records.map((r: Record<string, any>) => this.mapFields(r, 'inbound') as MedicalRecord);
  }

  async fetchAppointments(since?: string): Promise<AppointmentRecord[]> {
    const params = new URLSearchParams();
    if (since) params.set('modified_after', since);

    const endpoint = this.config.settings?.appointmentsEndpoint || '/appointments';
    const response = await this.request(`${endpoint}?${params}`);
    const data = await response.json();

    const records = Array.isArray(data) ? data : data.data || data.appointments || [];
    return records.map((r: Record<string, any>) => this.mapFields(r, 'inbound') as AppointmentRecord);
  }

  async pushPatient(patient: PatientRecord): Promise<{ externalId: string }> {
    const mapped = this.mapFields(patient as any, 'outbound');
    const endpoint = this.config.settings?.patientsEndpoint || '/patients';
    const response = await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(mapped),
    });
    const data = await response.json();
    return { externalId: data.id || data.externalId || data.patient_id };
  }

  async pushAppointment(appointment: AppointmentRecord): Promise<{ externalId: string }> {
    const mapped = this.mapFields(appointment as any, 'outbound');
    const endpoint = this.config.settings?.appointmentsEndpoint || '/appointments';
    const response = await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(mapped),
    });
    const data = await response.json();
    return { externalId: data.id || data.externalId || data.appointment_id };
  }

  private async request(path: string, init?: RequestInit): Promise<Response> {
    const url = `${this.config.baseUrl}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders(),
    };

    const response = await fetch(url, { ...init, headers });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status} ${response.statusText}`);
    }

    return response;
  }
}
