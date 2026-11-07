import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestItem, RestItemDocument } from '../schemas/rest-item.schema';
import { CreateRestItemDto } from '../dto/create-rest-item.dto';
import { UpdateRestItemDto } from '../dto/update-rest-item.dto';

@Injectable()
export class RestItemService {
  constructor(
    @InjectModel(RestItem.name)
    private readonly restItemModel: Model<RestItemDocument>,
  ) {}

  async findAll(): Promise<RestItem[]> {
    return this.restItemModel.find().sort({ createdAt: 1 }).exec();
  }

  async findById(id: string): Promise<RestItem> {
    const item = await this.restItemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async create(dto: CreateRestItemDto): Promise<RestItem> {
    const created = new this.restItemModel({
      name: dto.name.trim(),
      price: dto.price,
      category: dto.category ? dto.category.trim() : 'General',
      isAvailable: dto.isAvailable ?? true,
    });
    return created.save();
  }

  async update(id: string, dto: UpdateRestItemDto): Promise<RestItem> {
    const item = await this.findById(id);
    if (dto.name !== undefined) item.name = dto.name.trim();
    if (dto.price !== undefined) item.price = dto.price;
    if (dto.category !== undefined) item.category = dto.category.trim();
    if (dto.isAvailable !== undefined) item.isAvailable = dto.isAvailable;
    return item.save();
  }

  async delete(id: string): Promise<{ success: boolean; id: string }> {
    const item = await this.findById(id);
    await this.restItemModel.deleteOne({ _id: item._id }).exec();
    return { success: true, id };
  }
}

