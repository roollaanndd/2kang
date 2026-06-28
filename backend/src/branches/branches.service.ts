import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../database/entities/branch.entity';

@Injectable()
export class BranchesService {
  constructor(@InjectRepository(Branch) private repo: Repository<Branch>) {}

  async findAll(activeOnly = true): Promise<Branch[]> {
    const qb = this.repo.createQueryBuilder('b').orderBy('b.name', 'ASC');
    if (activeOnly) qb.where('b.isActive = true');
    return qb.getMany();
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.repo.findOne({ where: { id } });
    if (!branch) throw new NotFoundException('Branch not found');
    return branch;
  }

  async create(data: Partial<Branch>): Promise<Branch> {
    const branch = this.repo.create(data);
    return this.repo.save(branch);
  }

  async update(id: string, data: Partial<Branch>): Promise<Branch> {
    await this.findOne(id);
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.update(id, { isActive: false });
  }

  async resetQueueCounter(id: string): Promise<Branch> {
    const branch = await this.findOne(id);
    branch.currentQueueCounter = 0;
    branch.queueCounterResetDate = new Date().toISOString().slice(0, 10);
    return this.repo.save(branch);
  }
}
