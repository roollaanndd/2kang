import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  @Index()
  phone: string;

  @Column({ select: false })
  passwordHash: string;

  @Column({ nullable: true, select: false })
  pinHash: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  gender: 'M' | 'F';

  @Column({ unique: true })
  @Index()
  medicalRecordNo: string;

  @Column({ unique: true })
  @Index()
  memberCode: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  fcmToken: string;

  @Column({ type: 'varchar', default: 'id' })
  language: 'id' | 'en';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany('Appointment', 'patient')
  appointments: any[];

  @OneToMany('Transaction', 'patient')
  transactions: any[];

  @OneToMany('FamilyMember', 'owner')
  familyMembers: any[];
}
