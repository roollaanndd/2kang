import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from '../entities/admin-user.entity';
import { Service } from '../entities/service.entity';
import { Branch } from '../entities/branch.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(AdminUser) private adminRepo: Repository<AdminUser>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
    private config: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedAdminUsers();
    await this.seedServices();
    await this.seedBranches();
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
    console.log('Seeded default admin users');
  }

  private async seedServices() {
    const count = await this.serviceRepo.count();
    if (count > 0) return;

    await this.serviceRepo.save([
      { name: 'Pembersihan Karang Gigi', nameEn: 'Scaling & Polishing', icon: 's1', duration: 30, priceMin: 150000, priceMax: 300000, category: 'preventive', sortOrder: 0 },
      { name: 'Tambal Gigi', nameEn: 'Dental Filling', icon: 's2', duration: 45, priceMin: 200000, priceMax: 500000, category: 'restorative', sortOrder: 1 },
      { name: 'Cabut Gigi', nameEn: 'Tooth Extraction', icon: 's3', duration: 30, priceMin: 250000, priceMax: 750000, category: 'surgical', sortOrder: 2 },
      { name: 'Perawatan Saluran Akar', nameEn: 'Root Canal', icon: 's4', duration: 60, priceMin: 1000000, priceMax: 2500000, category: 'endodontic', sortOrder: 3 },
      { name: 'Veneer Gigi', nameEn: 'Dental Veneer', icon: 's5', duration: 60, priceMin: 2000000, priceMax: 5000000, category: 'cosmetic', sortOrder: 4 },
      { name: 'Kawat Gigi', nameEn: 'Orthodontics / Braces', icon: 's6', duration: 45, priceMin: 5000000, priceMax: 15000000, category: 'orthodontic', sortOrder: 5 },
      { name: 'Implant Gigi', nameEn: 'Dental Implant', icon: 's7', duration: 90, priceMin: 8000000, priceMax: 20000000, category: 'surgical', sortOrder: 6 },
      { name: 'Pemutihan Gigi', nameEn: 'Teeth Whitening', icon: 's8', duration: 60, priceMin: 1500000, priceMax: 3500000, category: 'cosmetic', sortOrder: 7 },
    ]);
    console.log('Seeded 8 dental services');
  }

  private async seedBranches() {
    const count = await this.branchRepo.count();
    if (count > 0) return;

    await this.branchRepo.save([
      {
        name: 'OMDC Kelapa Gading',
        city: 'Jakarta Utara',
        address: 'Jl. Boulevard Raya Blok QJ No. 1, Kelapa Gading',
        phone: '021-45867890',
        whatsapp: '628123456789',
        hours: 'Sen-Sab 09:00-21:00, Min 09:00-15:00',
        queuePrefix: 'A',
      },
    ]);
    console.log('Seeded default branch');
  }
}
