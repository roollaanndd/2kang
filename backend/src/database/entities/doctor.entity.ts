import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @Column({ nullable: true })
  specialtyEn: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ type: 'text', nullable: true })
  aboutEn: string;

  @Column({ type: 'jsonb', default: [] })
  schedule: string[];

  @Column({ type: 'jsonb', default: [] })
  languages: string[];

  @Column({ nullable: true })
  licenseNumber: string;

  @Column({ nullable: true })
  branchId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany('Appointment', 'doctor')
  appointments: any[];
}
