import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RestBillService } from '../services/rest-bill.service';
import { CreateRestBillDto } from '../dto/create-rest-bill.dto';

@Controller('rest-bills')
export class RestBillController {
  constructor(private readonly restBillService: RestBillService) {}

  @Get()
  async findAll(@Query('limit') limit?: number) {
    return this.restBillService.findAll(limit ? Number(limit) : 100);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.restBillService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRestBillDto) {
    return this.restBillService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.restBillService.delete(id);
  }
}

