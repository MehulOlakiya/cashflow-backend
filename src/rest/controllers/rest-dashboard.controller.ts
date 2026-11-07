import { Controller, Get } from '@nestjs/common';
import { RestDashboardService } from '../services/rest-dashboard.service';

@Controller('rest-dashboard')
export class RestDashboardController {
  constructor(private readonly restDashboardService: RestDashboardService) {}

  @Get()
  async getDashboard() {
    return this.restDashboardService.getAnalytics();
  }

  @Get('analytics')
  async getAnalytics() {
    return this.restDashboardService.getAnalytics();
  }
}

