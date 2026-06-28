import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../database/entities/user.entity';
import { AdminUser } from '../database/entities/admin-user.entity';
import { OmdcCodeService } from '../omdc-code/omdc-code.service';
import { RegisterDto, LoginDto, AdminLoginDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(AdminUser) private adminRepo: Repository<AdminUser>,
    private jwt: JwtService,
    private omdcCode: OmdcCodeService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userRepo.findOne({
      where: [{ email: dto.email }, { phone: dto.phone }],
    });
    if (existing) throw new ConflictException('Email or phone already registered');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const counter = await this.userRepo.count();
    const medicalRecordNo = `RM-${new Date().getFullYear()}-${String(counter + 1).padStart(3, '0')}`;

    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      passwordHash,
      dob: dto.dob,
      gender: dto.gender,
      medicalRecordNo,
      memberCode: '', // set after save (needs ID)
    });

    const saved = await this.userRepo.save(user);
    saved.memberCode = this.omdcCode.memberCode(saved.id);
    await this.userRepo.update(saved.id, { memberCode: saved.memberCode });

    return { id: saved.id, memberCode: saved.memberCode };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo
      .createQueryBuilder('u')
      .addSelect('u.passwordHash')
      .where('u.email = :identity OR u.phone = :identity', { identity: dto.identity })
      .getOne();

    if (!user || !user.isActive) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwt.sign({ sub: user.id, email: user.email, type: 'patient' });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        memberCode: user.memberCode,
        medicalRecordNo: user.medicalRecordNo,
      },
    };
  }

  async setPin(userId: string, pin: string) {
    if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
      throw new BadRequestException('PIN must be exactly 6 digits');
    }
    const pinHash = await bcrypt.hash(pin, 10);
    await this.userRepo.update(userId, { pinHash });
  }

  async verifyPin(userId: string, pin: string): Promise<boolean> {
    const user = await this.userRepo
      .createQueryBuilder('u')
      .addSelect('u.pinHash')
      .where('u.id = :userId', { userId })
      .getOne();
    if (!user?.pinHash) return false;
    return bcrypt.compare(pin, user.pinHash);
  }

  async adminLogin(dto: AdminLoginDto) {
    const admin = await this.adminRepo
      .createQueryBuilder('a')
      .addSelect('a.passwordHash')
      .where('a.username = :username', { username: dto.username })
      .getOne();

    if (!admin || !admin.isActive) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, admin.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    await this.adminRepo.update(admin.id, { lastLoginAt: new Date() });

    const token = this.jwt.sign({ sub: admin.id, email: admin.email, type: 'admin', role: admin.role });

    return {
      token,
      user: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role,
      },
    };
  }
}
