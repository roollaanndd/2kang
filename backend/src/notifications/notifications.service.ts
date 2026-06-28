import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from '../database/entities/notification.entity';
import { QueueGateway } from '../queue/gateway/queue.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) private repo: Repository<Notification>,
    private queueGateway: QueueGateway,
  ) {}

  async create(data: {
    userId?: string;
    type: NotificationType;
    title: string;
    body: string;
    isBroadcast?: boolean;
    branchId?: string;
  }): Promise<Notification> {
    const notif = this.repo.create(data);
    const saved = await this.repo.save(notif);

    if (data.isBroadcast) {
      this.queueGateway.broadcastNotification({
        type: data.type,
        title: data.title,
        body: data.body,
      });
    } else if (data.userId) {
      this.queueGateway.notifyPatient(data.userId, {
        type: data.type,
        title: data.title,
        body: data.body,
      });
    }

    return saved;
  }

  async findByUser(userId: string): Promise<Notification[]> {
    return this.repo.find({
      where: [{ userId }, { isBroadcast: true }],
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.repo.count({
      where: [
        { userId, read: false },
        { isBroadcast: true, read: false },
      ],
    });
  }

  async markRead(id: string): Promise<void> {
    await this.repo.update(id, { read: true });
  }

  async markAllRead(userId: string): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .update()
      .set({ read: true })
      .where('userId = :userId OR isBroadcast = true', { userId })
      .execute();
  }

  async broadcast(data: { type: NotificationType; title: string; body: string; branchId?: string }) {
    return this.create({ ...data, isBroadcast: true });
  }
}
