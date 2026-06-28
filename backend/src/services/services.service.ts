import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../database/entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(@InjectRepository(Service) private repo: Repository<Service>) {}

  async findAll(activeOnly = true): Promise<Service[]> {
    const qb = this.repo.createQueryBuilder('s').orderBy('s.sortOrder', 'ASC').addOrderBy('s.name', 'ASC');
    if (activeOnly) qb.where('s.isActive = true');
    return qb.getMany();
  }

  async findOne(id: string): Promise<Service> {
    const svc = await this.repo.findOne({ where: { id } });
    if (!svc) throw new NotFoundException('Service not found');
    return svc;
  }

  async create(data: Partial<Service>): Promise<Service> {
    const svc = this.repo.create(data);
    return this.repo.save(svc);
  }

  async update(id: string, data: Partial<Service>): Promise<Service> {
    await this.findOne(id);
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.update(id, { isActive: false });
  }

  async reorder(ids: string[]): Promise<void> {
    const updates = ids.map((id, i) => this.repo.update(id, { sortOrder: i }));
    await Promise.all(updates);
  }
}
