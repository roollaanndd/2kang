import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CmsService } from './cms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpsertContentDto, CreatePromotionDto, UpdatePromotionDto } from './dto/cms.dto';

@ApiTags('cms')
@Controller('cms')
export class CmsController {
  constructor(private service: CmsService) {}

  @Public()
  @Get('content/:section')
  @ApiOperation({ summary: 'Get CMS content by section' })
  @ApiQuery({ name: 'lang', required: false })
  @ApiQuery({ name: 'branchId', required: false })
  getSection(
    @Param('section') section: string,
    @Query('lang') lang?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.service.getSection(section, lang, branchId);
  }

  @Post('content')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner', 'content-editor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create or update CMS content' })
  upsertContent(@Body() dto: UpsertContentDto, @CurrentUser() user: { id: string }) {
    return this.service.upsertContent(dto.section, dto.key, dto.value, {
      language: dto.language,
      branchId: dto.branchId,
      updatedBy: user.id,
    });
  }

  @Delete('content/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft-delete CMS content' })
  deleteContent(@Param('id') id: string) {
    return this.service.deleteContent(id);
  }

  // --- Kiosk Settings ---

  @Public()
  @Get('kiosk-settings')
  @ApiOperation({ summary: 'Get kiosk settings' })
  @ApiQuery({ name: 'branchId', required: false })
  getKioskSettings(@Query('branchId') branchId?: string) {
    return this.service.getKioskSettings(branchId);
  }

  @Patch('kiosk-settings/:key')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a kiosk setting' })
  updateKioskSetting(
    @Param('key') key: string,
    @Body('value') value: any,
    @Body('branchId') branchId?: string,
    @CurrentUser() user?: { id: string },
  ) {
    return this.service.updateKioskSetting(key, value, branchId, user?.id);
  }

  // --- Promotions ---

  @Public()
  @Get('promotions')
  @ApiOperation({ summary: 'Get active promotions' })
  @ApiQuery({ name: 'branchId', required: false })
  getPromotions(@Query('branchId') branchId?: string) {
    return this.service.getPromotions(branchId);
  }

  @Post('promotions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner', 'marketing')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new promotion' })
  createPromotion(@Body() dto: CreatePromotionDto) {
    return this.service.createPromotion(dto);
  }

  @Patch('promotions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner', 'marketing')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a promotion' })
  updatePromotion(@Param('id') id: string, @Body() dto: UpdatePromotionDto) {
    return this.service.updatePromotion(id, dto);
  }

  @Delete('promotions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('master-admin', 'owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft-delete a promotion' })
  deletePromotion(@Param('id') id: string) {
    return this.service.deletePromotion(id);
  }
}
