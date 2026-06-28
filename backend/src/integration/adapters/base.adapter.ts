import { IntegrationConfig } from '../entities/integration-config.entity';

export interface PatientRecord {
  externalId: string;
  name: string;
  email?: string;
  phone: string;
  dob?: string;
  gender?: 'M' | 'F';
  medicalRecordNo?: string;
  address?: string;
  metadata?: Record<string, any>;
}

export interface MedicalRecord {
  externalId: string;
  patientExternalId: string;
  date: string;
  diagnosis?: string;
  treatment?: string;
  doctorName?: string;
  notes?: string;
  teeth?: number[];
  attachments?: string[];
  metadata?: Record<string, any>;
}

export interface AppointmentRecord {
  externalId: string;
  patientExternalId: string;
  doctorName?: string;
  serviceName?: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
}

export interface ConnectionTestResult {
  success: boolean;
  message: string;
  serverVersion?: string;
  capabilities?: string[];
}

export abstract class BaseIntegrationAdapter {
  protected config: IntegrationConfig;

  constructor(config: IntegrationConfig) {
    this.config = config;
  }

  abstract testConnection(): Promise<ConnectionTestResult>;

  abstract fetchPatients(since?: string, limit?: number): Promise<PatientRecord[]>;

  abstract fetchMedicalRecords(patientExternalId?: string, since?: string): Promise<MedicalRecord[]>;

  abstract fetchAppointments(since?: string): Promise<AppointmentRecord[]>;

  abstract pushPatient(patient: PatientRecord): Promise<{ externalId: string }>;

  abstract pushAppointment(appointment: AppointmentRecord): Promise<{ externalId: string }>;

  protected getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = { ...this.config.headers };

    switch (this.config.authMethod) {
      case 'api_key':
        headers['X-API-Key'] = this.config.apiKey || '';
        break;
      case 'bearer':
        headers['Authorization'] = `Bearer ${this.config.apiKey}`;
        break;
      case 'basic':
        const credentials = Buffer.from(`${this.config.apiKey}:${this.config.apiSecret}`).toString('base64');
        headers['Authorization'] = `Basic ${credentials}`;
        break;
    }

    return headers;
  }

  protected mapFields(record: Record<string, any>, direction: 'inbound' | 'outbound'): Record<string, any> {
    if (!this.config.fieldMapping) return record;

    const mapped: Record<string, any> = {};
    const mapping = this.config.fieldMapping;

    if (direction === 'inbound') {
      for (const [externalKey, internalKey] of Object.entries(mapping)) {
        if (record[externalKey] !== undefined) {
          mapped[internalKey] = record[externalKey];
        }
      }
      for (const [key, value] of Object.entries(record)) {
        if (!mapping[key] && mapped[key] === undefined) {
          mapped[key] = value;
        }
      }
    } else {
      const reverseMapping = Object.fromEntries(
        Object.entries(mapping).map(([k, v]) => [v, k]),
      );
      for (const [internalKey, externalKey] of Object.entries(reverseMapping)) {
        if (record[internalKey] !== undefined) {
          mapped[externalKey] = record[internalKey];
        }
      }
    }

    return mapped;
  }
}
