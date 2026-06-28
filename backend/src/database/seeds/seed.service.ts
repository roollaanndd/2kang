import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from '../entities/admin-user.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(AdminUser) private adminRepo: Repository<AdminUser>,
    private config: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedAdminUsers();
  }

  private async seedAdminUsers() {
    const count = await this.adminRepo.count();
    if (count > 0) return;

    const adminPass = this.config.get<string>('ADMIN_DEFAULT_PASSWORD') ?? 'Omdc#2025!Sa';
    const ownerPass = this.config.get<string>('OWNER_DEFAULT_PASSWORD') ?? 'Omdc#2025!Ow';

    await this.adminRepo.save([
      {
        username: 'admin',
        passwordHash: await bcrypt.hash(adminPass, 12),
        name: 'Administrator',
        email: 'admin@omdcdental.com',
        role: 'master-admin',
      },
      {
        username: 'owner',
        passwordHash: await bcrypt.hash(ownerPass, 12),
        name: 'Owner',
        email: 'owner@omdcdental.com',
        role: 'owner',
      },
    ]);

    console.log('Seeded default admin users (admin / owner)');
  }
}
