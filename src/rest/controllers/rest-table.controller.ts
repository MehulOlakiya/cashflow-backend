import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RestTableService } from '../services/rest-table.service';
import { CreateRestTableDto } from '../dto/create-rest-table.dto';
import { UpdateRestTableDto } from '../dto/update-rest-table.dto';
import { UpdateRestOrderDto } from '../dto/update-rest-order.dto';
import { TransferRestTableDto } from '../dto/transfer-rest-table.dto';

@Controller('rest-tables')
export class RestTableController {
  constructor(private readonly restTableService: RestTableService) {}

  @Get()
  async findAll() {
    return this.restTableService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.restTableService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRestTableDto) {
    return this.restTableService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRestTableDto) {
    return this.restTableService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.restTableService.delete(id);
  }

  @Post(':id/orders')
  async updateOrders(@Param('id') id: string, @Body() dto: UpdateRestOrderDto) {
    return this.restTableService.updateOrders(id, dto);
  }

  @Post(':id/free')
  async freeTable(@Param('id') id: string) {
    return this.restTableService.freeTable(id);
  }

  @Post(':id/transfer')
  async transferOrders(
    @Param('id') id: string,
    @Body() dto: TransferRestTableDto,
  ) {
    return this.restTableService.transferOrders(id, dto);
  }
}

