import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../database/entities/branch.entity';
import { Transaction } from '../database/entities/transaction.entity';
import { QueueGateway } from './gateway/queue.gateway';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
    @InjectRepository(Transaction) private txnRepo: Repository<Transaction>,
    private gateway: QueueGateway,
  ) {}

  async assignQueueNumber(branchId: string): Promise<string> {
    const branch = await this.branchRepo.findOne({ where: { id: branchId } });
    if (!branch) throw new NotFoundException('Branch not found');

    const today = new Date().toISOString().slice(0, 10);
    if (branch.queueCounterResetDate !== today) {
      branch.currentQueueCounter = 0;
      branch.queueCounterResetDate = today;
    }

    branch.currentQueueCounter += 1;
    await this.branchRepo.save(branch);

    const queueNumber = `${branch.queuePrefix}${String(branch.currentQueueCounter).padStart(3, '0')}`;

    this.gateway.notifyBranch(branchId, {
      type: 'queue-assigned',
      queueNumber,
    });

    return queueNumber;
  }

  async getQueueStatus(branchId: string) {
    const today = new Date().toISOString().slice(0, 10);

    const transactions = await this.txnRepo.find({
      where: { branchId, date: today },
      order: { createdAt: 'ASC' },
    });

    const serving = transactions.filter((t) => t.status === 'paid' || t.status === 'checked-in');
    const waiting = transactions.filter((t) => t.status === 'checked-in');
    const done = transactions.filter((t) => t.status === 'done');

    const branch = await this.branchRepo.findOne({ where: { id: branchId } });

    return {
      currentNumber: serving[0]?.queueNumber ?? null,
      waiting: waiting.map((t) => ({
        queueNumber: t.queueNumber,
        patientName: t.patientName,
        serviceName: t.serviceName,
      })),
      totalWaiting: waiting.length,
      totalServed: done.length,
      totalToday: transactions.length,
      prefix: branch?.queuePrefix ?? 'A',
    };
  }

  async callNext(branchId: string) {
    const today = new Date().toISOString().slice(0, 10);

    const next = await this.txnRepo.findOne({
      where: { branchId, date: today, status: 'checked-in' as any },
      order: { createdAt: 'ASC' },
    });

    if (!next) return null;

    next.status = 'paid';
    await this.txnRepo.save(next);

    this.gateway.notifyBranch(branchId, {
      type: 'now-serving',
      queueNumber: next.queueNumber,
      patientName: next.patientName,
    });

    if (next.patientId) {
      this.gateway.notifyPatient(next.patientId, {
        type: 'queue',
        title: 'Giliran Anda!',
        body: `Nomor antrian ${next.queueNumber} — silakan menuju ruang periksa`,
      });
    }

    return next;
  }

  async markDone(transactionId: string) {
    const txn = await this.txnRepo.findOne({ where: { id: transactionId } });
    if (!txn) throw new NotFoundException('Transaction not found');

    txn.status = 'done';
    txn.completedAt = new Date();
    await this.txnRepo.save(txn);

    if (txn.branchId) {
      this.gateway.notifyBranch(txn.branchId, {
        type: 'queue-done',
        queueNumber: txn.queueNumber,
      });
    }

    return txn;
  }
}
