import { IsString, IsOptional, IsNumber, IsIn, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiPropertyOptional({ example: 'Andi Pratama', description: 'Override patient name (defaults to JWT user name)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  patientName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  serviceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  serviceName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  doctorName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  time?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ enum: ['app', 'kiosk'] })
  @IsOptional()
  @IsIn(['app', 'kiosk'])
  source?: 'app' | 'kiosk';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  branchId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  appointmentId?: string;
}

export class LookupCodeDto {
  @ApiProperty({ example: '7H3K9Q', description: 'Any OMDC code (booking, transaction, or member)' })
  @IsString()
  @MaxLength(20)
  code: string;
}
