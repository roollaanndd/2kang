import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private service: ServicesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all dental services' })
  @ApiQuery({ name: 'all', required: false, description: 'Include inactive services' })
  findAll(@Query('all') all?: string) {
    return this.service.findAll(all !== 'true');
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get service by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new service (admin)' })
  create(@Body() dto: CreateServiceDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a service (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft-delete a service (admin)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch('reorder/batch')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reorder services (admin)' })
  reorder(@Body('ids') ids: string[]) {
    return this.service.reorder(ids);
  }
}
