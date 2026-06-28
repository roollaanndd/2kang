import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../database/entities/appointment.entity';
import { Transaction } from '../database/entities/transaction.entity';
import { User } from '../database/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Appointment) private apptRepo: Repository<Appointment>,
    @InjectRepository(Transaction) private txnRepo: Repository<Transaction>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getDashboard(branchId?: string, dateFrom?: string, dateTo?: string) {
    const today = new Date().toISOString().slice(0, 10);
    const from = dateFrom ?? today;
    const to = dateTo ?? today;

    const [totalPatients, todayAppointments, revenue, queueStats] = await Promise.all([
      this.userRepo.count({ where: { isActive: true } }),
      this.getAppointmentCount(today, branchId),
      this.getRevenue(from, to, branchId),
      this.getQueueStats(today, branchId),
    ]);

    return {
      totalPatients,
      todayAppointments,
      revenue,
      queueStats,
      period: { from, to },
    };
  }

  private async getAppointmentCount(date: string, branchId?: string): Promise<number> {
    const qb = this.apptRepo.createQueryBuilder('a').where('a.date = :date', { date });
    if (branchId) qb.andWhere('a.branchId = :branchId', { branchId });
    return qb.getCount();
  }

  private async getRevenue(from: string, to: string, branchId?: string) {
    const qb = this.txnRepo
      .createQueryBuilder('t')
      .select('COALESCE(SUM(t.amount), 0)', 'total')
      .addSelect('COUNT(*)', 'count')
      .where('t.paid = true')
      .andWhere('t.date >= :from', { from })
      .andWhere('t.date <= :to', { to });

    if (branchId) qb.andWhere('t.branchId = :branchId', { branchId });

    const result = await qb.getRawOne();
    return {
      total: parseInt(result?.total ?? '0', 10),
      transactionCount: parseInt(result?.count ?? '0', 10),
    };
  }

  private async getQueueStats(date: string, branchId?: string) {
    const qb = this.txnRepo.createQueryBuilder('t').where('t.date = :date', { date });
    if (branchId) qb.andWhere('t.branchId = :branchId', { branchId });

    const all = await qb.getMany();

    return {
      total: all.length,
      waiting: all.filter((t) => t.status === 'checked-in').length,
      serving: all.filter((t) => t.status === 'paid' && !t.completedAt).length,
      done: all.filter((t) => t.status === 'done').length,
    };
  }

  async getAppointmentReport(from: string, to: string, branchId?: string) {
    const qb = this.apptRepo
      .createQueryBuilder('a')
      .select('a.date', 'date')
      .addSelect('a.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('a.date >= :from', { from })
      .andWhere('a.date <= :to', { to })
      .groupBy('a.date')
      .addGroupBy('a.status')
      .orderBy('a.date', 'ASC');

    if (branchId) qb.andWhere('a.branchId = :branchId', { branchId });

    return qb.getRawMany();
  }

  async getRevenueReport(from: string, to: string, branchId?: string) {
    const qb = this.txnRepo
      .createQueryBuilder('t')
      .select('t.date', 'date')
      .addSelect('COALESCE(SUM(t.amount), 0)', 'total')
      .addSelect('COUNT(*)', 'count')
      .addSelect('t.paymentMethod', 'paymentMethod')
      .where('t.paid = true')
      .andWhere('t.date >= :from', { from })
      .andWhere('t.date <= :to', { to })
      .groupBy('t.date')
      .addGroupBy('t.paymentMethod')
      .orderBy('t.date', 'ASC');

    if (branchId) qb.andWhere('t.branchId = :branchId', { branchId });

    return qb.getRawMany();
  }

  async getServicePopularity(from: string, to: string, branchId?: string) {
    const qb = this.txnRepo
      .createQueryBuilder('t')
      .select('t.serviceName', 'serviceName')
      .addSelect('COUNT(*)', 'count')
      .addSelect('COALESCE(SUM(t.amount), 0)', 'revenue')
      .where('t.date >= :from', { from })
      .andWhere('t.date <= :to', { to })
      .groupBy('t.serviceName')
      .orderBy('count', 'DESC');

    if (branchId) qb.andWhere('t.branchId = :branchId', { branchId });

    return qb.getRawMany();
  }

  async getPatientGrowth(from: string, to: string) {
    const result = await this.userRepo
      .createQueryBuilder('u')
      .select("TO_CHAR(u.createdAt, 'YYYY-MM')", 'month')
      .addSelect('COUNT(*)', 'newPatients')
      .where('u.createdAt >= :from', { from: `${from}T00:00:00` })
      .andWhere('u.createdAt <= :to', { to: `${to}T23:59:59` })
      .groupBy("TO_CHAR(u.createdAt, 'YYYY-MM')")
      .orderBy('month', 'ASC')
      .getRawMany();

    return result;
  }
}
