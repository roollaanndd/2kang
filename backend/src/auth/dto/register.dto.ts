import { IsString, IsEmail, IsOptional, MinLength, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Andi Pratama' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'andi@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '0812-3456-7890' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ example: '1990-05-15' })
  @IsOptional()
  @IsString()
  dob?: string;

  @ApiPropertyOptional({ enum: ['M', 'F'] })
  @IsOptional()
  @IsIn(['M', 'F'])
  gender?: 'M' | 'F';
}

export class LoginDto {
  @ApiProperty({ example: 'andi@email.com', description: 'Email or phone number' })
  @IsString()
  identity: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  password: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '0812-3456-7890' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  code: string;
}

export class SetPinDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  pin: string;
}

export class AdminLoginDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'Omdc#2025!Sa' })
  @IsString()
  password: string;
}
