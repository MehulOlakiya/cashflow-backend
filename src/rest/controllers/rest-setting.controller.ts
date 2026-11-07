import { Body, Controller, Get, Patch } from '@nestjs/common';
import { RestSettingService } from '../services/rest-setting.service';
import { UpdateRestSettingDto } from '../dto/update-rest-setting.dto';

@Controller('rest-settings')
export class RestSettingController {
  constructor(private readonly restSettingService: RestSettingService) {}

  @Get()
  async getSettings() {
    return this.restSettingService.getSettings();
  }

  @Patch()
  async updateSettings(@Body() dto: UpdateRestSettingDto) {
    return this.restSettingService.updateSettings(dto);
  }
}

