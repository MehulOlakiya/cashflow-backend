import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestTable, RestTableDocument } from '../schemas/rest-table.schema';
import { CreateRestTableDto } from '../dto/create-rest-table.dto';
import { UpdateRestTableDto } from '../dto/update-rest-table.dto';
import { UpdateRestOrderDto } from '../dto/update-rest-order.dto';
import { TransferRestTableDto } from '../dto/transfer-rest-table.dto';

@Injectable()
export class RestTableService {
  constructor(
    @InjectModel(RestTable.name)
    private readonly restTableModel: Model<RestTableDocument>,
  ) {}

  async findAll(): Promise<RestTable[]> {
    return this.restTableModel.find().sort({ tableNumber: 1, createdAt: 1 }).exec();
  }

  async findById(id: string): Promise<RestTable> {
    const table = await this.restTableModel.findById(id).exec();
    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }
    return table;
  }

  async create(dto: CreateRestTableDto): Promise<RestTable> {
    const count = await this.restTableModel.countDocuments();
    const tableNumber = dto.tableNumber || count + 1;
    const table = new this.restTableModel({
      name: dto.name.trim(),
      tableNumber,
      capacity: dto.capacity || 4,
      status: 'empty',
      orders: [],
      totalAmount: 0,
    });
    return table.save();
  }

  async update(id: string, dto: UpdateRestTableDto): Promise<RestTable> {
    const table = await this.findById(id);
    if (dto.name !== undefined) table.name = dto.name.trim();
    if (dto.tableNumber !== undefined) table.tableNumber = dto.tableNumber;
    if (dto.capacity !== undefined) table.capacity = dto.capacity;
    if (dto.status !== undefined) table.status = dto.status;
    return table.save();
  }

  async updateOrders(id: string, dto: UpdateRestOrderDto): Promise<RestTable> {
    const table = await this.findById(id);
    const validOrders = (dto.orders || []).filter((o) => o.quantity > 0);
    const totalAmount = validOrders.reduce((sum, item) => sum + item.price * item.quantity, 0);

    table.orders = validOrders.map((o) => ({
      itemId: o.itemId,
      name: o.name,
      price: o.price,
      quantity: o.quantity,
      addedAt: o.addedAt || new Date(),
    }));
    table.totalAmount = totalAmount;
    table.status = validOrders.length > 0 ? 'occupied' : 'empty';

    return table.save();
  }

  async freeTable(id: string): Promise<RestTable> {
    const table = await this.findById(id);
    table.orders = [];
    table.totalAmount = 0;
    table.status = 'empty';
    return table.save();
  }

  async transferOrders(sourceTableId: string, dto: TransferRestTableDto): Promise<{
    sourceTable: RestTable;
    targetTable: RestTable;
  }> {
    if (sourceTableId === dto.targetTableId) {
      throw new BadRequestException('Cannot transfer orders to the same table');
    }

    const sourceTable = await this.findById(sourceTableId);
    const targetTable = await this.findById(dto.targetTableId);

    if (sourceTable.orders.length === 0) {
      throw new BadRequestException('Source table has no active orders to transfer');
    }

    // Merge orders into target table
    const orderMap = new Map<string, { itemId: string; name: string; price: number; quantity: number }>();

    for (const item of targetTable.orders) {
      orderMap.set(item.itemId, {
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });
    }

    for (const item of sourceTable.orders) {
      if (orderMap.has(item.itemId)) {
        orderMap.get(item.itemId)!.quantity += item.quantity;
      } else {
        orderMap.set(item.itemId, {
          itemId: item.itemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        });
      }
    }

    const mergedOrders = Array.from(orderMap.values()).map((o) => ({
      ...o,
      addedAt: new Date(),
    }));

    targetTable.orders = mergedOrders;
    targetTable.totalAmount = mergedOrders.reduce((sum, i) => sum + i.price * i.quantity, 0);
    targetTable.status = 'occupied';

    // Reset source table
    sourceTable.orders = [];
    sourceTable.totalAmount = 0;
    sourceTable.status = 'empty';

    await Promise.all([sourceTable.save(), targetTable.save()]);

    return { sourceTable, targetTable };
  }

  async delete(id: string): Promise<{ success: boolean; id: string }> {
    const table = await this.findById(id);
    await this.restTableModel.deleteOne({ _id: table._id }).exec();
    return { success: true, id };
  }
}

