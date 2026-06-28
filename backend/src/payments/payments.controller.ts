import { Controller, Get, Post, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private service: PaymentsService) {}

  @Post('snap/:transactionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Midtrans Snap payment token' })
  createSnap(@Param('transactionId') transactionId: string) {
    return this.service.createSnapToken(transactionId);
  }

  @Public()
  @Post('webhook/midtrans')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Midtrans payment webhook callback' })
  handleWebhook(@Body() body: any) {
    return this.service.handleWebhook(body);
  }

  @Get('status/:transactionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment status for a transaction' })
  getStatus(@Param('transactionId') transactionId: string) {
    return this.service.getPaymentStatus(transactionId);
  }

  @Post('manual/:transactionId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner', 'cashier', 'branch-admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Record manual payment (cash/EDC) at counter' })
  manualPayment(
    @Param('transactionId') transactionId: string,
    @Body('method') method: string,
    @Body('reference') reference?: string,
  ) {
    return this.service.manualPayment(transactionId, method, reference);
  }
}
