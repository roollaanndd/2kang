import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsUrl, IsObject } from 'class-validator';

export class CreateIntegrationDto {
  @ApiProperty({ example: 'OMDC Legacy CMS' })
  @IsString()
  name: string;

  @ApiProperty({ enum: ['clinic_management', 'medical_records', 'billing', 'inventory', 'custom'] })
  @IsEnum(['clinic_management', 'medical_records', 'billing', 'inventory', 'custom'])
  type: string;

  @ApiProperty({ example: 'https://cms.omdc.co.id/api' })
  @IsUrl()
  baseUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apiKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apiSecret?: string;

  @ApiPropertyOptional({ enum: ['api_key', 'bearer', 'basic', 'oauth2', 'hmac'] })
  @IsOptional()
  @IsEnum(['api_key', 'bearer', 'basic', 'oauth2', 'hmac'])
  authMethod?: string;

  @ApiPropertyOptional({ example: { 'X-Clinic-Id': 'omdc-kg' } })
  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;

  @ApiPropertyOptional({
    description: 'Map external field names to OMDC fields',
    example: { patient_name: 'name', patient_phone: 'phone', medical_id: 'medicalRecordNo' },
  })
  @IsOptional()
  @IsObject()
  fieldMapping?: Record<string, string>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;
}

export class UpdateIntegrationDto extends PartialType(CreateIntegrationDto) {}

export class ImportPatientsDto {
  @ApiProperty({ description: 'Integration config ID' })
  @IsString()
  integrationId: string;

  @ApiPropertyOptional({ description: 'Only import records modified after this date' })
  @IsOptional()
  @IsString()
  since?: string;

  @ApiPropertyOptional({ description: 'Max records to import per batch', example: 100 })
  @IsOptional()
  batchSize?: number;
}

export class ImportMedicalRecordsDto {
  @ApiProperty()
  @IsString()
  integrationId: string;

  @ApiPropertyOptional({ description: 'Import records for a specific patient (external ID)' })
  @IsOptional()
  @IsString()
  patientExternalId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  since?: string;
}

export class ExportDataDto {
  @ApiProperty()
  @IsString()
  integrationId: string;

  @ApiProperty({ enum: ['patient', 'appointment', 'transaction', 'medical_record'] })
  @IsEnum(['patient', 'appointment', 'transaction', 'medical_record'])
  entity: string;

  @ApiPropertyOptional({ description: 'Filter by date range start' })
  @IsOptional()
  @IsString()
  from?: string;

  @ApiPropertyOptional({ description: 'Filter by date range end' })
  @IsOptional()
  @IsString()
  to?: string;
}

export class WebhookPayloadDto {
  @ApiProperty({ description: 'Event type from external system' })
  @IsString()
  event: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  timestamp?: string;
}

export class TestConnectionDto {
  @ApiProperty()
  @IsString()
  integrationId: string;
}
