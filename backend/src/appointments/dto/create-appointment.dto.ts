import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'service-uuid' })
  @IsString()
  serviceId: string;

  @ApiProperty({ example: 'doctor-uuid' })
  @IsString()
  doctorId: string;

  @ApiProperty({ example: '2026-07-01' })
  @IsString()
  date: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  time: string;

  @ApiPropertyOptional({ example: 'branch-uuid' })
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiPropertyOptional({ example: [11, 21, 36] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  selectedTeeth?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ enum: ['app', 'kiosk', 'website', 'admin', 'walk-in'] })
  @IsOptional()
  @IsString()
  source?: 'app' | 'kiosk' | 'website' | 'admin' | 'walk-in';
}

export class UpdateAppointmentStatusDto {
  @ApiProperty({ enum: ['confirmed', 'checked-in', 'serving', 'done', 'cancelled', 'no-show'] })
  @IsString()
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  room?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  doctorNotes?: string;
}
