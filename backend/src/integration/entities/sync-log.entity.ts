import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { IntegrationConfig } from './integration-config.entity';

export type SyncDirection = 'inbound' | 'outbound';
export type SyncStatus = 'pending' | 'processing' | 'success' | 'failed' | 'partial';
export type SyncEntity = 'patient' | 'medical_record' | 'appointment' | 'transaction' | 'doctor' | 'service';

@Entity('sync_logs')
export class SyncLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  integrationId: string;

  @ManyToOne(() => IntegrationConfig)
  @JoinColumn({ name: 'integrationId' })
  integration: IntegrationConfig;

  @Column({ type: 'varchar' })
  entity: SyncEntity;

  @Column({ type: 'varchar' })
  direction: SyncDirection;

  @Column({ type: 'varchar', default: 'pending' })
  status: SyncStatus;

  @Column({ default: 0 })
  totalRecords: number;

  @Column({ default: 0 })
  processedRecords: number;

  @Column({ default: 0 })
  failedRecords: number;

  @Column({ type: 'jsonb', nullable: true })
  errors: Array<{ record: string; error: string }>;

  @Column({ nullable: true })
  startedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
