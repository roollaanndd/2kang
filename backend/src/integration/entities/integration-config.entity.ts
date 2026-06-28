import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export type IntegrationType = 'clinic_management' | 'medical_records' | 'billing' | 'inventory' | 'custom';
export type IntegrationStatus = 'active' | 'inactive' | 'error';

@Entity('integration_configs')
export class IntegrationConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  name: string;

  @Column({ type: 'varchar' })
  type: IntegrationType;

  @Column({ type: 'varchar', default: 'inactive' })
  status: IntegrationStatus;

  @Column()
  baseUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  headers: Record<string, string>;

  @Column({ nullable: true, select: false })
  apiKey: string;

  @Column({ nullable: true, select: false })
  apiSecret: string;

  @Column({ type: 'varchar', default: 'api_key' })
  authMethod: 'api_key' | 'bearer' | 'basic' | 'oauth2' | 'hmac';

  @Column({ type: 'jsonb', nullable: true })
  fieldMapping: Record<string, string>;

  @Column({ type: 'jsonb', nullable: true })
  settings: Record<string, any>;

  @Column({ nullable: true })
  webhookSecret: string;

  @Column({ nullable: true })
  lastSyncAt: Date;

  @Column({ nullable: true })
  lastError: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
