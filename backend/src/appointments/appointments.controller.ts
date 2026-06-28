import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentStatusDto } from './dto/create-appointment.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('appointments')
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentsController {
  constructor(private service: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Book a new appointment' })
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateAppointmentDto) {
    return this.service.create(user.id, dto);
  }

  @Get()
  @Roles('admin', 'owner', 'master-admin', 'branch-admin')
  @ApiOperation({ summary: 'List appointments with filters (admin only)' })
  @ApiQuery({ name: 'date', required: false })
  @ApiQuery({ name: 'doctorId', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'branchId', required: false })
  findAll(
    @Query('date') date?: string,
    @Query('doctorId') doctorId?: string,
    @Query('status') status?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.findAll({ date, doctorId, status: status as any, branchId });
  }

  @Get('today')
  @Roles('admin', 'owner', 'master-admin', 'branch-admin')
  @ApiOperation({ summary: 'Get today\'s appointments (admin only)' })
  findToday(@Query('branchId') branchId?: string) {
    return this.service.findToday(branchId);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get current patient\'s appointments' })
  findMine(@CurrentUser() user: { id: string }) {
    return this.service.findByPatient(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by ID (own or admin)' })
  findOne(@CurrentUser() user: { id: string; type?: string }, @Param('id') id: string) {
    return this.service.findOne(id, user);
  }

  @Patch(':id/status')
  @Roles('admin', 'owner', 'master-admin', 'branch-admin')
  @ApiOperation({ summary: 'Update appointment status (admin only)' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateAppointmentStatusDto) {
    return this.service.updateStatus(id, dto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel an appointment (own or admin)' })
  cancel(@CurrentUser() user: { id: string; type?: string }, @Param('id') id: string) {
    return this.service.cancel(id, user);
  }

  @Public()
  @Get('availability/:doctorId/:date')
  @ApiOperation({ summary: 'Get booked time slots for a doctor on a date' })
  checkAvailability(@Param('doctorId') doctorId: string, @Param('date') date: string) {
    return this.service.checkAvailability(doctorId, date);
  }
}
