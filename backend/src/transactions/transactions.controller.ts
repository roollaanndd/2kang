import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, LookupCodeDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private service: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register a new transaction (booking)' })
  create(@Body() dto: CreateTransactionDto) {
    return this.service.create(dto);
  }

  @Public()
  @Post('lookup')
  @ApiOperation({ summary: 'Look up a transaction by any OMDC code' })
  lookup(@Body() dto: LookupCodeDto) {
    return this.service.lookupCode(dto.code);
  }

  @Patch(':id/check-in')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check in a booking (assigns queue number)' })
  checkIn(@Param('id') id: string, @Body('branchId') branchId: string) {
    return this.service.checkIn(id, branchId);
  }

  @Patch(':id/pay')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark a transaction as paid' })
  markPaid(
    @Param('id') id: string,
    @Body('paymentMethod') paymentMethod?: string,
    @Body('paymentReference') paymentReference?: string,
  ) {
    return this.service.markPaid(id, paymentMethod, paymentReference);
  }

  @Get('patient/:patientId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transactions for a patient' })
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }

  @Get('by-date/:date')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transactions by date' })
  findByDate(@Param('date') date: string, @Query('branchId') branchId?: string) {
    return this.service.findByDate(date, branchId);
  }
}
