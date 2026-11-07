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
import { RestItemService } from '../services/rest-item.service';
import { CreateRestItemDto } from '../dto/create-rest-item.dto';
import { UpdateRestItemDto } from '../dto/update-rest-item.dto';

@Controller('rest-items')
export class RestItemController {
  constructor(private readonly restItemService: RestItemService) {}

  @Get()
  async findAll() {
    return this.restItemService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.restItemService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRestItemDto) {
    return this.restItemService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRestItemDto) {
    return this.restItemService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.restItemService.delete(id);
  }
}

