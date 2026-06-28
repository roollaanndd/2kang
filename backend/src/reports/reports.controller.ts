import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('master-admin', 'owner', 'branch-admin')
@Controller('reports')
export class ReportsController {
  constructor(private service: ReportsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get admin dashboard summary' })
  @ApiQuery({ name: 'branchId', required: false })
  @ApiQuery({ name: 'from', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'to', required: false, example: '2026-12-31' })
  getDashboard(
    @Query('branchId') branchId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.getDashboard(branchId, from, to);
  }

  @Get('appointments')
  @ApiOperation({ summary: 'Appointment statistics by date and status' })
  @ApiQuery({ name: 'from', required: true, example: '2026-01-01' })
  @ApiQuery({ name: 'to', required: true, example: '2026-12-31' })
  @ApiQuery({ name: 'branchId', required: false })
  getAppointments(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getAppointmentReport(from, to, branchId);
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Revenue report by date and payment method' })
  @ApiQuery({ name: 'from', required: true })
  @ApiQuery({ name: 'to', required: true })
  @ApiQuery({ name: 'branchId', required: false })
  getRevenue(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getRevenueReport(from, to, branchId);
  }

  @Get('services')
  @ApiOperation({ summary: 'Service popularity ranking' })
  @ApiQuery({ name: 'from', required: true })
  @ApiQuery({ name: 'to', required: true })
  @ApiQuery({ name: 'branchId', required: false })
  getServicePopularity(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getServicePopularity(from, to, branchId);
  }

  @Get('patients')
  @ApiOperation({ summary: 'Patient growth by month' })
  @ApiQuery({ name: 'from', required: true })
  @ApiQuery({ name: 'to', required: true })
  getPatientGrowth(@Query('from') from: string, @Query('to') to: string) {
    return this.service.getPatientGrowth(from, to);
  }
}
