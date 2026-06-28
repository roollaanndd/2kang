import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionStatus } from '../database/entities/transaction.entity';
import { OmdcCodeService } from '../omdc-code/omdc-code.service';
import { QueueService } from '../queue/queue.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repo: Repository<Transaction>,
    private omdcCode: OmdcCodeService,
    private queueService: QueueService,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const code = this.omdcCode.transactionCode(dto.patientName);
    const bCode = this.omdcCode.bookingCode();
    const mCode = this.omdcCode.memberCode(dto.patientId);

    const txn = this.repo.create({
      code,
      bookingCode: bCode,
      patientId: dto.patientId,
      patientName: dto.patientName,
      memberCode: mCode,
      appointmentId: dto.appointmentId,
      serviceId: dto.serviceId,
      serviceName: dto.serviceName,
      doctorName: dto.doctorName,
      date: dto.date,
      time: dto.time,
      amount: dto.amount,
      source: dto.source ?? 'app',
      branchId: dto.branchId,
      status: 'booked',
      paid: false,
    });

    return this.repo.save(txn);
  }

  async lookupCode(raw: string) {
    const parsed = this.omdcCode.parseOmdcCode(raw);

    if (parsed.valid && parsed.kind === 'transaction' && parsed.key) {
      const txn = await this.repo.findOne({ where: { code: parsed.code } });
      return txn ? { found: true, kind: 'transaction', transaction: txn } : { found: false, kind: 'transaction' };
    }

    if (parsed.valid && parsed.kind === 'member' && parsed.key) {
      const txn = await this.repo.findOne({
        where: { memberCode: parsed.code },
        order: { createdAt: 'DESC' },
      });
      return txn ? { found: true, kind: 'member', transaction: txn } : { found: false, kind: 'member' };
    }

    const bareCode = this.omdcCode.extractBookingCode(raw);
    if (bareCode) {
      const txn = await this.repo.findOne({ where: { bookingCode: bareCode } });
      if (txn) return { found: true, kind: 'booking', transaction: txn };
    }

    return { found: false, kind: 'unknown' };
  }

  async checkIn(id: string, branchId: string): Promise<Transaction> {
    const txn = await this.repo.findOne({ where: { id } });
    if (!txn) throw new NotFoundException('Transaction not found');

    const queueNumber = await this.queueService.assignQueueNumber(branchId);
    txn.queueNumber = queueNumber;
    txn.status = txn.paid ? 'paid' : 'checked-in';
    txn.checkedInAt = new Date();
    txn.branchId = branchId;

    return this.repo.save(txn);
  }

  async markPaid(id: string, paymentMethod?: string, paymentReference?: string): Promise<Transaction> {
    const txn = await this.repo.findOne({ where: { id } });
    if (!txn) throw new NotFoundException('Transaction not found');

    txn.paid = true;
    txn.status = 'paid';
    txn.paidAt = new Date();
    if (paymentMethod) txn.paymentMethod = paymentMethod;
    if (paymentReference) txn.paymentReference = paymentReference;

    return this.repo.save(txn);
  }

  async findByPatient(patientId: string): Promise<Transaction[]> {
    return this.repo.find({
      where: { patientId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByDate(date: string, branchId?: string): Promise<Transaction[]> {
    const qb = this.repo.createQueryBuilder('t').where('t.date = :date', { date });
    if (branchId) qb.andWhere('t.branchId = :branchId', { branchId });
    return qb.orderBy('t.createdAt', 'ASC').getMany();
  }

  async findByStatus(status: TransactionStatus, branchId?: string): Promise<Transaction[]> {
    const qb = this.repo.createQueryBuilder('t').where('t.status = :status', { status });
    if (branchId) qb.andWhere('t.branchId = :branchId', { branchId });
    return qb.orderBy('t.createdAt', 'ASC').getMany();
  }
}
