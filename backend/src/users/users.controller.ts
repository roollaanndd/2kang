import { Controller, Get, Patch, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all patients (admin)' })
  findAll(@Query('search') search?: string) {
    return this.service.findAll(search);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getMe(@CurrentUser() user: { id: string }) {
    return this.service.findOne(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get patient by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  updateMe(@CurrentUser() user: { id: string }, @Body() data: any) {
    return this.service.update(user.id, data);
  }

  @Get('me/family')
  @ApiOperation({ summary: 'Get family members' })
  getFamily(@CurrentUser() user: { id: string }) {
    return this.service.getFamilyMembers(user.id);
  }

  @Post('me/family')
  @ApiOperation({ summary: 'Add family member' })
  addFamily(@CurrentUser() user: { id: string }, @Body() data: any) {
    return this.service.addFamilyMember(user.id, data);
  }

  @Delete('me/family/:memberId')
  @ApiOperation({ summary: 'Remove family member' })
  removeFamily(@CurrentUser() user: { id: string }, @Param('memberId') memberId: string) {
    return this.service.removeFamilyMember(user.id, memberId);
  }
}
