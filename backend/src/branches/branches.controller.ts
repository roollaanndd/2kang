import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateBranchDto, UpdateBranchDto } from './dto/branch.dto';

@ApiTags('branches')
@Controller('branches')
export class BranchesController {
  constructor(private service: BranchesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all clinic branches' })
  @ApiQuery({ name: 'all', required: false })
  findAll(@Query('all') all?: string) {
    return this.service.findAll(all !== 'true');
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get branch by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new branch (admin)' })
  create(@Body() dto: CreateBranchDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a branch (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft-delete a branch (admin)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/reset-queue')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner', 'branch-admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Manually reset queue counter for a branch' })
  resetQueue(@Param('id') id: string) {
    return this.service.resetQueueCounter(id);
  }
}
