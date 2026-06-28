import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegrationConfig } from './entities/integration-config.entity';
import { SyncLog } from './entities/sync-log.entity';
import {
  CreateIntegrationDto,
  UpdateIntegrationDto,
  ImportPatientsDto,
  ImportMedicalRecordsDto,
  ExportDataDto,
  WebhookPayloadDto,
} from './dto/integration.dto';
import { BaseIntegrationAdapter, PatientRecord, MedicalRecord } from './adapters/base.adapter';
import { RestApiAdapter } from './adapters/rest-api.adapter';
import { User } from '../database/entities/user.entity';

@Injectable()
export class IntegrationService {
  private readonly logger = new Logger(IntegrationService.name);

  constructor(
    @InjectRepository(IntegrationConfig)
    private configRepo: Repository<IntegrationConfig>,
    @InjectRepository(SyncLog)
    private syncLogRepo: Repository<SyncLog>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async listIntegrations() {
    return this.configRepo.find({ order: { createdAt: 'DESC' } });
  }

  async getIntegration(id: string) {
    const config = await this.configRepo.findOne({ where: { id } });
    if (!config) throw new NotFoundException('Integration not found');
    return config;
  }

  async createIntegration(dto: CreateIntegrationDto) {
    const config = this.configRepo.create(dto as any);
    return this.configRepo.save(config);
  }

  async updateIntegration(id: string, dto: UpdateIntegrationDto) {
    const config = await this.getIntegration(id);
    Object.assign(config, dto);
    return this.configRepo.save(config);
  }

  async deleteIntegration(id: string) {
    const config = await this.getIntegration(id);
    await this.configRepo.remove(config);
    return { deleted: true };
  }

  async testConnection(id: string) {
    const config = await this.getFullConfig(id);
    const adapter = this.getAdapter(config);
    const result = await adapter.testConnection();

    await this.configRepo.update(id, {
      status: result.success ? 'active' : 'error',
      lastError: result.success ? undefined : result.message,
    });

    return result;
  }

  async importPatients(dto: ImportPatientsDto) {
    const config = await this.getFullConfig(dto.integrationId);
    const adapter = this.getAdapter(config);

    const syncLog = await this.createSyncLog(config.id, 'patient', 'inbound');

    try {
      await this.syncLogRepo.update(syncLog.id, { status: 'processing', startedAt: new Date() });

      const patients = await adapter.fetchPatients(dto.since, dto.batchSize);
      await this.syncLogRepo.update(syncLog.id, { totalRecords: patients.length });

      let processed = 0;
      let failed = 0;
      const errors: Array<{ record: string; error: string }> = [];

      for (const patient of patients) {
        try {
          await this.upsertPatient(patient);
          processed++;
        } catch (err) {
          failed++;
          errors.push({
            record: patient.externalId || patient.phone,
            error: (err as Error).message,
          });
        }
        await this.syncLogRepo.update(syncLog.id, { processedRecords: processed, failedRecords: failed });
      }

      await this.syncLogRepo.update(syncLog.id, {
        status: failed === 0 ? 'success' : 'partial',
        errors: errors.length > 0 ? errors : undefined,
        completedAt: new Date(),
      });

      await this.configRepo.update(config.id, { lastSyncAt: new Date(), lastError: undefined });

      return {
        syncLogId: syncLog.id,
        total: patients.length,
        processed,
        failed,
        errors,
      };
    } catch (err) {
      await this.syncLogRepo.update(syncLog.id, {
        status: 'failed',
        errors: [{ record: 'batch', error: (err as Error).message }],
        completedAt: new Date(),
      });
      await this.configRepo.update(config.id, { lastError: (err as Error).message });
      throw err;
    }
  }

  async importMedicalRecords(dto: ImportMedicalRecordsDto) {
    const config = await this.getFullConfig(dto.integrationId);
    const adapter = this.getAdapter(config);

    const syncLog = await this.createSyncLog(config.id, 'medical_record', 'inbound');

    try {
      await this.syncLogRepo.update(syncLog.id, { status: 'processing', startedAt: new Date() });

      const records = await adapter.fetchMedicalRecords(dto.patientExternalId, dto.since);
      await this.syncLogRepo.update(syncLog.id, { totalRecords: records.length });

      await this.syncLogRepo.update(syncLog.id, {
        status: 'success',
        processedRecords: records.length,
        completedAt: new Date(),
      });

      await this.configRepo.update(config.id, { lastSyncAt: new Date(), lastError: undefined });

      return {
        syncLogId: syncLog.id,
        total: records.length,
        records,
      };
    } catch (err) {
      await this.syncLogRepo.update(syncLog.id, {
        status: 'failed',
        errors: [{ record: 'batch', error: (err as Error).message }],
        completedAt: new Date(),
      });
      throw err;
    }
  }

  async exportData(dto: ExportDataDto) {
    const config = await this.getFullConfig(dto.integrationId);
    const syncLog = await this.createSyncLog(config.id, dto.entity as any, 'outbound');

    try {
      await this.syncLogRepo.update(syncLog.id, { status: 'processing', startedAt: new Date() });

      let data: any[];

      switch (dto.entity) {
        case 'patient':
          data = await this.getExportPatients(dto.from, dto.to);
          break;
        case 'appointment':
          data = await this.getExportAppointments(dto.from, dto.to);
          break;
        default:
          throw new BadRequestException(`Export not supported for entity: ${dto.entity}`);
      }

      await this.syncLogRepo.update(syncLog.id, {
        status: 'success',
        totalRecords: data.length,
        processedRecords: data.length,
        completedAt: new Date(),
      });

      return {
        syncLogId: syncLog.id,
        entity: dto.entity,
        total: data.length,
        data,
      };
    } catch (err) {
      await this.syncLogRepo.update(syncLog.id, {
        status: 'failed',
        errors: [{ record: 'export', error: (err as Error).message }],
        completedAt: new Date(),
      });
      throw err;
    }
  }

  async handleWebhook(integrationId: string, payload: WebhookPayloadDto, signature?: string) {
    const config = await this.getFullConfig(integrationId);

    if (!config.webhookSecret) {
      throw new BadRequestException('Webhook secret not configured for this integration');
    }

    if (!signature) {
      throw new BadRequestException('Missing webhook signature header');
    }

    const crypto = await import('crypto');
    const expected = crypto
      .createHmac('sha256', config.webhookSecret)
      .update(JSON.stringify(payload))
      .digest('hex');

    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
      throw new BadRequestException('Invalid webhook signature');
    }

    this.logger.log(`Webhook received: ${payload.event} from integration ${config.name}`);

    switch (payload.event) {
      case 'patient.created':
      case 'patient.updated':
        if (payload.data) {
          await this.upsertPatient(payload.data as PatientRecord);
        }
        break;

      case 'appointment.created':
      case 'appointment.updated':
        this.logger.log(`Appointment event: ${payload.event}`, payload.data);
        break;

      case 'medical_record.created':
        this.logger.log(`Medical record event: ${payload.event}`, payload.data);
        break;

      default:
        this.logger.warn(`Unhandled webhook event: ${payload.event}`);
    }

    return { received: true, event: payload.event };
  }

  async getSyncLogs(integrationId?: string, limit = 50) {
    const where = integrationId ? { integrationId } : {};
    return this.syncLogRepo.find({
      where,
      order: { createdAt: 'DESC' },
      take: limit,
      relations: { integration: true },
    });
  }

  private async getFullConfig(id: string): Promise<IntegrationConfig> {
    const config = await this.configRepo
      .createQueryBuilder('c')
      .addSelect('c.apiKey')
      .addSelect('c.apiSecret')
      .where('c.id = :id', { id })
      .getOne();

    if (!config) throw new NotFoundException('Integration not found');
    return config;
  }

  private getAdapter(config: IntegrationConfig): BaseIntegrationAdapter {
    return new RestApiAdapter(config);
  }

  private async createSyncLog(integrationId: string, entity: string, direction: string) {
    const log = this.syncLogRepo.create({
      integrationId,
      entity: entity as any,
      direction: direction as any,
    });
    return this.syncLogRepo.save(log);
  }

  private async upsertPatient(data: PatientRecord) {
    const existing = await this.userRepo.findOne({
      where: [
        ...(data.email ? [{ email: data.email }] : []),
        { phone: data.phone },
      ],
    });

    if (existing) {
      if (data.name) existing.name = data.name;
      if (data.dob) existing.dob = data.dob;
      if (data.gender) existing.gender = data.gender;
      return this.userRepo.save(existing);
    }

    this.logger.log(`New patient from integration: ${data.name} (${data.phone})`);
    return null;
  }

  private async getExportPatients(from?: string, to?: string) {
    const qb = this.userRepo.createQueryBuilder('u')
      .select(['u.id', 'u.name', 'u.email', 'u.phone', 'u.dob', 'u.gender', 'u.medicalRecordNo', 'u.memberCode', 'u.createdAt']);

    if (from) qb.andWhere('u.createdAt >= :from', { from });
    if (to) qb.andWhere('u.createdAt <= :to', { to });

    return qb.getMany();
  }

  private async getExportAppointments(from?: string, to?: string) {
    const { Appointment } = await import('../database/entities/appointment.entity');
    const appointmentRepo = this.configRepo.manager.getRepository(Appointment);

    const qb = appointmentRepo.createQueryBuilder('a')
      .leftJoinAndSelect('a.patient', 'p')
      .leftJoinAndSelect('a.doctor', 'd')
      .leftJoinAndSelect('a.service', 's');

    if (from) qb.andWhere('a.date >= :from', { from });
    if (to) qb.andWhere('a.date <= :to', { to });

    return qb.getMany();
  }
}
