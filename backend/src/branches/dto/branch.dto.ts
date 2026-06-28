import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ example: 'OMDC Kelapa Gading' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Jakarta Utara' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Jl. Boulevard Raya Blok QJ No. 1' })
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: '021-4586xxxx' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: '628123456789' })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional({ example: 'Sen-Sab 09:00-21:00' })
  @IsOptional()
  @IsString()
  hours?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: 'A' })
  @IsOptional()
  @IsString()
  queuePrefix?: string;
}

export class UpdateBranchDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hours?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  queuePrefix?: string;
}
