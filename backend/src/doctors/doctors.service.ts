import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../database/entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(@InjectRepository(Doctor) private repo: Repository<Doctor>) {}

  async findAll(branchId?: string): Promise<Doctor[]> {
    const qb = this.repo.createQueryBuilder('d').where('d.isActive = true').orderBy('d.name', 'ASC');
    if (branchId) qb.andWhere('d.branchId = :branchId', { branchId });
    return qb.getMany();
  }

  async findOne(id: string): Promise<Doctor> {
    const doc = await this.repo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException('Doctor not found');
    return doc;
  }

  async update(id: string, data: Partial<Doctor>): Promise<Doctor> {
    await this.findOne(id);
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async getAvailability(id: string, date: string) {
    const doc = await this.findOne(id);
    return { doctorId: id, date, schedule: doc.schedule, available: doc.available };
  }

  async setSchedule(id: string, schedule: string[]): Promise<Doctor> {
    return this.update(id, { schedule });
  }
}
