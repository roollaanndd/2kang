import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('cms_content')
export class CmsContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  section: string;

  @Column()
  key: string;

  @Column({ type: 'jsonb' })
  value: any;

  @Column({ nullable: true })
  branchId: string;

  @Column({ type: 'varchar', default: 'id' })
  language: 'id' | 'en';

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ nullable: true })
  updatedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
