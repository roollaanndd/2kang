import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';
import { Service } from './service.entity';

export type AppointmentStatus = 'booked' | 'confirmed' | 'checked-in' | 'serving' | 'done' | 'cancelled' | 'no-show';

@Entity('appointments')
@Index(['date', 'doctorId', 'time'], { unique: true })
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @ManyToOne(() => User, (u) => u.appointments)
  @JoinColumn({ name: 'patientId' })
  patient: User;

  @Column()
  doctorId: string;

  @ManyToOne(() => Doctor, (d) => d.appointments)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @Column()
  serviceId: string;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  @Column({ type: 'date' })
  @Index()
  date: string;

  @Column({ type: 'varchar', length: 5 })
  time: string;

  @Column({ type: 'varchar', default: 'booked' })
  status: AppointmentStatus;

  @Column({ nullable: true })
  branchId: string;

  @Column({ nullable: true })
  queueNumber: string;

  @Column({ nullable: true })
  room: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  doctorNotes: string;

  @Column({ type: 'jsonb', nullable: true })
  selectedTeeth: number[];

  @Column({ type: 'varchar', default: 'app' })
  source: 'app' | 'kiosk' | 'website' | 'admin' | 'walk-in';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
