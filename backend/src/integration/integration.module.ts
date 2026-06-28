import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';
import { IntegrationConfig } from './entities/integration-config.entity';
import { SyncLog } from './entities/sync-log.entity';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IntegrationConfig, SyncLog, User]),
  ],
  controllers: [IntegrationController],
  providers: [IntegrationService],
  exports: [IntegrationService],
})
export class IntegrationModule {}
