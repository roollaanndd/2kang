import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { QueueService } from './queue.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('queue')
@Controller('queue')
export class QueueController {
  constructor(private service: QueueService) {}

  @Public()
  @Get(':branchId/status')
  @ApiOperation({ summary: 'Get current queue status for a branch' })
  getStatus(@Param('branchId') branchId: string) {
    return this.service.getQueueStatus(branchId);
  }

  @Post(':branchId/call-next')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Call next patient in queue (admin)' })
  callNext(@Param('branchId') branchId: string) {
    return this.service.callNext(branchId);
  }

  @Post('done/:transactionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark a queue item as done (admin)' })
  markDone(@Param('transactionId') transactionId: string) {
    return this.service.markDone(transactionId);
  }
}
