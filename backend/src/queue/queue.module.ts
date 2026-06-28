import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from '../database/entities/branch.entity';
import { Transaction } from '../database/entities/transaction.entity';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { QueueGateway } from './gateway/queue.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Transaction])],
  providers: [QueueService, QueueGateway],
  controllers: [QueueController],
  exports: [QueueService, QueueGateway],
})
export class QueueModule {}
