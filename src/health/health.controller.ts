import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: '疎通確認',
    description: 'apiの疎通を確認する',
  })
  @ApiResponse({ status: 200, description: '疎通成功' })
  check() {
    return this.healthService.check();
  }
}
