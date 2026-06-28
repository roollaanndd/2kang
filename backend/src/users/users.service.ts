import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { FamilyMember } from '../database/entities/family-member.entity';
import { OmdcCodeService } from '../omdc-code/omdc-code.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(FamilyMember) private familyRepo: Repository<FamilyMember>,
    private omdcCode: OmdcCodeService,
  ) {}

  async findAll(search?: string): Promise<User[]> {
    const qb = this.userRepo.createQueryBuilder('u').orderBy('u.createdAt', 'DESC');
    if (search) {
      qb.where('u.name ILIKE :s OR u.email ILIKE :s OR u.phone ILIKE :s OR u.medicalRecordNo ILIKE :s', {
        s: `%${search}%`,
      });
    }
    return qb.getMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Patient not found');
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    await this.findOne(id);
    await this.userRepo.update(id, data);
    return this.findOne(id);
  }

  async getFamilyMembers(ownerId: string): Promise<FamilyMember[]> {
    return this.familyRepo.find({ where: { ownerId }, order: { createdAt: 'ASC' } });
  }

  async addFamilyMember(ownerId: string, data: Partial<FamilyMember>): Promise<FamilyMember> {
    const member = this.familyRepo.create({
      ...data,
      ownerId,
      memberCode: this.omdcCode.memberCode(`family:${ownerId}:${Date.now()}`),
    });
    return this.familyRepo.save(member);
  }

  async removeFamilyMember(ownerId: string, memberId: string): Promise<void> {
    await this.familyRepo.delete({ id: memberId, ownerId });
  }
}
