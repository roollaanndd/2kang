import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { IntegrationService } from './integration.service';
import {
  CreateIntegrationDto,
  UpdateIntegrationDto,
  ImportPatientsDto,
  ImportMedicalRecordsDto,
  ExportDataDto,
  WebhookPayloadDto,
} from './dto/integration.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('integration')
@Controller('integration')
@ApiBearerAuth()
export class IntegrationController {
  constructor(private integrationService: IntegrationService) {}

  @Get()
  @Roles('admin', 'owner')
  @ApiOperation({ summary: 'List all integration configurations' })
  list() {
    return this.integrationService.listIntegrations();
  }

  @Get(':id')
  @Roles('admin', 'owner')
  @ApiOperation({ summary: 'Get integration configuration by ID' })
  @ApiParam({ name: 'id', description: 'Integration config UUID' })
  get(@Param('id') id: string) {
    return this.integrationService.getIntegration(id);
  }

  @Post()
  @Roles('owner')
  @ApiOperation({ summary: 'Create a new integration configuration' })
  create(@Body() dto: CreateIntegrationDto) {
    return this.integrationService.createIntegration(dto);
  }

  @Patch(':id')
  @Roles('owner')
  @ApiOperation({ summary: 'Update integration configuration' })
  update(@Param('id') id: string, @Body() dto: UpdateIntegrationDto) {
    return this.integrationService.updateIntegration(id, dto);
  }

  @Delete(':id')
  @Roles('owner')
  @ApiOperation({ summary: 'Delete integration configuration' })
  remove(@Param('id') id: string) {
    return this.integrationService.deleteIntegration(id);
  }

  @Post(':id/test')
  @Roles('admin', 'owner')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Test connection to external system' })
  testConnection(@Param('id') id: string) {
    return this.integrationService.testConnection(id);
  }

  @Post('import/patients')
  @Roles('admin', 'owner')
  @ApiOperation({ summary: 'Import patients from external system' })
  importPatients(@Body() dto: ImportPatientsDto) {
    return this.integrationService.importPatients(dto);
  }

  @Post('import/medical-records')
  @Roles('admin', 'owner')
  @ApiOperation({ summary: 'Import medical records from external system' })
  importMedicalRecords(@Body() dto: ImportMedicalRecordsDto) {
    return this.integrationService.importMedicalRecords(dto);
  }

  @Post('export')
  @Roles('admin', 'owner')
  @ApiOperation({ summary: 'Export OMDC data for external system' })
  exportData(@Body() dto: ExportDataDto) {
    return this.integrationService.exportData(dto);
  }

  @Public()
  @Post('webhook/:integrationId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive webhook from external system' })
  @ApiParam({ name: 'integrationId', description: 'Integration config UUID' })
  handleWebhook(
    @Param('integrationId') integrationId: string,
    @Body() payload: WebhookPayloadDto,
    @Headers('x-webhook-signature') signature?: string,
  ) {
    return this.integrationService.handleWebhook(integrationId, payload, signature);
  }

  @Get('sync/logs')
  @Roles('admin', 'owner')
  @ApiOperation({ summary: 'Get sync history logs' })
  @ApiQuery({ name: 'integrationId', required: false })
  @ApiQuery({ name: 'limit', required: false })
  getSyncLogs(
    @Query('integrationId') integrationId?: string,
    @Query('limit') limit?: number,
  ) {
    return this.integrationService.getSyncLogs(integrationId, limit);
  }
}
