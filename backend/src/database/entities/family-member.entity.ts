import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('family_members')
export class FamilyMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, (u) => u.familyMembers)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  gender: 'M' | 'F';

  @Column()
  relationship: string;

  @Column({ nullable: true })
  medicalRecordNo: string;

  @Column({ nullable: true })
  memberCode: string;

  @CreateDateColumn()
  createdAt: Date;
}
