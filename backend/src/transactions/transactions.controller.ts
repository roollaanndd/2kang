import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, LookupCodeDto } from './dto/create-transaction.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private service: TransactionsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register a new transaction (booking)' })
  create(@CurrentUser() user: { id: string; name: string }, @Body() dto: CreateTransactionDto) {
    return this.service.create(user, dto);
  }

  @Public()
  @Throttle({ short: { ttl: 1000, limit: 1 }, medium: { ttl: 60000, limit: 10 } })
  @Post('lookup')
  @ApiOperation({ summary: 'Look up a transaction by OMDC code (rate limited)' })
  lookup(@Body() dto: LookupCodeDto) {
    return this.service.lookupCode(dto.code);
  }

  @Patch(':id/check-in')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check in a booking (assigns queue number)' })
  checkIn(@CurrentUser() user: { id: string }, @Param('id') id: string, @Body('branchId') branchId: string) {
    return this.service.checkIn(id, branchId, user.id);
  }

  @Patch(':id/pay')
  @Roles('admin', 'owner', 'master-admin', 'cashier', 'branch-admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark a transaction as paid (admin/cashier only)' })
  markPaid(
    @Param('id') id: string,
    @Body('paymentMethod') paymentMethod?: string,
    @Body('paymentReference') paymentReference?: string,
  ) {
    return this.service.markPaid(id, paymentMethod, paymentReference);
  }

  @Get('my')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current patient\'s transactions' })
  findMine(@CurrentUser() user: { id: string }) {
    return this.service.findByPatient(user.id);
  }

  @Get('patient/:patientId')
  @Roles('admin', 'owner', 'master-admin', 'branch-admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transactions for a patient (admin only)' })
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }

  @Get('by-date/:date')
  @Roles('admin', 'owner', 'master-admin', 'branch-admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transactions by date (admin only)' })
  findByDate(@Param('date') date: string, @Query('branchId') branchId?: string) {
    return this.service.findByDate(date, branchId);
  }
}
