import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from '../database/entities/appointment.entity';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from './dto/create-appointment.dto';
import { QueueGateway } from '../queue/gateway/queue.gateway';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private repo: Repository<Appointment>,
    private queueGateway: QueueGateway,
  ) {}

  async create(patientId: string, dto: CreateAppointmentDto): Promise<Appointment> {
    const conflict = await this.repo.findOne({
      where: { doctorId: dto.doctorId, date: dto.date, time: dto.time },
    });
    if (conflict && conflict.status !== 'cancelled') {
      throw new ConflictException('This time slot is already booked');
    }

    const appointment = this.repo.create({
      patientId,
      ...dto,
      status: 'booked',
    });
    return this.repo.save(appointment);
  }

  async findAll(filters?: { date?: string; doctorId?: string; status?: AppointmentStatus; branchId?: string }) {
    const qb = this.repo
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.patient', 'patient')
      .leftJoinAndSelect('a.doctor', 'doctor')
      .leftJoinAndSelect('a.service', 'service')
      .orderBy('a.date', 'ASC')
      .addOrderBy('a.time', 'ASC');

    if (filters?.date) qb.andWhere('a.date = :date', { date: filters.date });
    if (filters?.doctorId) qb.andWhere('a.doctorId = :doctorId', { doctorId: filters.doctorId });
    if (filters?.status) qb.andWhere('a.status = :status', { status: filters.status });
    if (filters?.branchId) qb.andWhere('a.branchId = :branchId', { branchId: filters.branchId });

    return qb.getMany();
  }

  async findOne(id: string, user?: { id: string; type?: string }): Promise<Appointment> {
    const appt = await this.repo.findOne({
      where: { id },
      relations: { patient: true, doctor: true, service: true },
    });
    if (!appt) throw new NotFoundException('Appointment not found');
    if (user && user.type !== 'admin' && appt.patientId !== user.id) {
      throw new ForbiddenException('Not your appointment');
    }
    return appt;
  }

  async findByPatient(patientId: string): Promise<Appointment[]> {
    return this.repo.find({
      where: { patientId },
      relations: { doctor: true, service: true },
      order: { date: 'DESC', time: 'DESC' },
    });
  }

  async findToday(branchId?: string): Promise<Appointment[]> {
    const today = new Date().toISOString().slice(0, 10);
    return this.findAll({ date: today, branchId });
  }

  async updateStatus(id: string, dto: UpdateAppointmentStatusDto): Promise<Appointment> {
    const appt = await this.findOne(id);
    appt.status = dto.status as AppointmentStatus;
    if (dto.room) appt.room = dto.room;
    if (dto.doctorNotes) appt.doctorNotes = dto.doctorNotes;

    const saved = await this.repo.save(appt);

    this.queueGateway.broadcastQueueUpdate({
      type: 'appointment-status',
      appointmentId: id,
      status: saved.status,
      queueNumber: saved.queueNumber,
    });

    return saved;
  }

  async checkAvailability(doctorId: string, date: string): Promise<string[]> {
    const booked = await this.repo.find({
      where: { doctorId, date },
      select: { time: true, status: true },
    });
    return booked.filter((a) => a.status !== 'cancelled').map((a) => a.time);
  }

  async cancel(id: string, user?: { id: string; type?: string }): Promise<Appointment> {
    const appt = await this.findOne(id, user);
    appt.status = 'cancelled';
    return this.repo.save(appt);
  }
}
