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

export type TransactionStatus = 'booked' | 'checked-in' | 'paid' | 'done' | 'cancelled';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  code: string;

  @Column({ unique: true })
  @Index()
  bookingCode: string;

  @Column()
  patientId: string;

  @ManyToOne(() => User, (u) => u.transactions)
  @JoinColumn({ name: 'patientId' })
  patient: User;

  @Column()
  patientName: string;

  @Column()
  memberCode: string;

  @Column({ nullable: true })
  appointmentId: string;

  @Column({ nullable: true })
  serviceId: string;

  @Column({ nullable: true })
  serviceName: string;

  @Column({ nullable: true })
  doctorName: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  @Index()
  queueNumber: string;

  @Column({ type: 'varchar', default: 'booked' })
  status: TransactionStatus;

  @Column({ default: false })
  paid: boolean;

  @Column({ type: 'integer', nullable: true })
  amount: number;

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ nullable: true })
  paymentReference: string;

  @Column({ type: 'varchar', default: 'app' })
  source: 'app' | 'kiosk';

  @Column({ nullable: true })
  branchId: string;

  @Column({ type: 'timestamp', nullable: true })
  checkedInAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
