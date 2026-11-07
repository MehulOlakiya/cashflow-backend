import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestTable, RestTableSchema } from './schemas/rest-table.schema';
import { RestItem, RestItemSchema } from './schemas/rest-item.schema';
import { RestBill, RestBillSchema } from './schemas/rest-bill.schema';
import { RestSetting, RestSettingSchema } from './schemas/rest-setting.schema';

import { RestTableService } from './services/rest-table.service';
import { RestItemService } from './services/rest-item.service';
import { RestBillService } from './services/rest-bill.service';
import { RestDashboardService } from './services/rest-dashboard.service';
import { RestSettingService } from './services/rest-setting.service';

import { RestTableController } from './controllers/rest-table.controller';
import { RestItemController } from './controllers/rest-item.controller';
import { RestBillController } from './controllers/rest-bill.controller';
import { RestDashboardController } from './controllers/rest-dashboard.controller';
import { RestSettingController } from './controllers/rest-setting.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RestTable.name, schema: RestTableSchema },
      { name: RestItem.name, schema: RestItemSchema },
      { name: RestBill.name, schema: RestBillSchema },
      { name: RestSetting.name, schema: RestSettingSchema },
    ]),
  ],
  controllers: [
    RestTableController,
    RestItemController,
    RestBillController,
    RestDashboardController,
    RestSettingController,
  ],
  providers: [
    RestTableService,
    RestItemService,
    RestBillService,
    RestDashboardService,
    RestSettingService,
  ],
  exports: [
    RestTableService,
    RestItemService,
    RestBillService,
    RestDashboardService,
    RestSettingService,
  ],
})
export class RestModule {}

