import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from '../entities/admin-user.entity';
import { Service } from '../entities/service.entity';
import { Branch } from '../entities/branch.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser, Service, Branch])],
  providers: [SeedService],
})
export class SeedModule {}
