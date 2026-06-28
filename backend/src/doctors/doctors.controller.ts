import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private service: DoctorsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all active doctors' })
  findAll(@Query('branchId') branchId?: string) {
    return this.service.findAll(branchId);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Public()
  @Get(':id/availability/:date')
  @ApiOperation({ summary: 'Get doctor availability for a date' })
  getAvailability(@Param('id') id: string, @Param('date') date: string) {
    return this.service.getAvailability(id, date);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update doctor profile (admin)' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Patch(':id/schedule')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set doctor schedule (admin)' })
  setSchedule(@Param('id') id: string, @Body('schedule') schedule: string[]) {
    return this.service.setSchedule(id, schedule);
  }
}
