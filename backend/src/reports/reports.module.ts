import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../database/entities/appointment.entity';
import { Transaction } from '../database/entities/transaction.entity';
import { User } from '../database/entities/user.entity';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Transaction, User])],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
