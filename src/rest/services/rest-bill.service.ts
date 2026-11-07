import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestBill, RestBillDocument, RestBillItem } from '../schemas/rest-bill.schema';
import { RestTable, RestTableDocument } from '../schemas/rest-table.schema';
import { CreateRestBillDto } from '../dto/create-rest-bill.dto';

@Injectable()
export class RestBillService {
  constructor(
    @InjectModel(RestBill.name)
    private readonly restBillModel: Model<RestBillDocument>,
    @InjectModel(RestTable.name)
    private readonly restTableModel: Model<RestTableDocument>,
  ) {}

  async create(dto: CreateRestBillDto): Promise<RestBill> {
    const table = await this.restTableModel.findById(dto.tableId).exec();
    if (!table) {
      throw new NotFoundException(`Table with ID ${dto.tableId} not found`);
    }

    let itemsToBill: RestBillItem[] = [];

    if (dto.items && dto.items.length > 0) {
      itemsToBill = dto.items.map((i) => ({
        itemId: i.itemId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        itemTotal: i.itemTotal || i.price * i.quantity,
      }));
    } else if (table.orders && table.orders.length > 0) {
      itemsToBill = table.orders.map((o) => ({
        itemId: o.itemId,
        name: o.name,
        price: o.price,
        quantity: o.quantity,
        itemTotal: o.price * o.quantity,
      }));
    } else {
      throw new BadRequestException('Cannot generate bill: table has no active orders');
    }

    const subtotal = itemsToBill.reduce((sum, item) => sum + item.itemTotal, 0);
    const tax = dto.tax || 0;
    const discount = dto.discount || 0;
    const total = Math.max(0, subtotal + tax - discount);

    const billsCount = await this.restBillModel.countDocuments();
    const billNumber = `BILL-${1001 + billsCount}`;

    const bill = new this.restBillModel({
      billNumber,
      tableId: table._id.toString(),
      tableName: table.name,
      items: itemsToBill,
      subtotal,
      tax,
      discount,
      total,
      paymentMode: dto.paymentMode || 'Cash',
      customerName: dto.customerName || '',
      customerPhone: dto.customerPhone || '',
      status: 'paid',
      settledAt: new Date(),
    });

    const savedBill = await bill.save();

    // Reset / empty table for subsequent guests
    table.orders = [];
    table.totalAmount = 0;
    table.status = 'empty';
    await table.save();

    return savedBill;
  }

  async findAll(limit = 100): Promise<RestBill[]> {
    return this.restBillModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }

  async findById(id: string): Promise<RestBill> {
    const bill = await this.restBillModel.findById(id).exec();
    if (!bill) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }
    return bill;
  }

  async delete(id: string): Promise<{ success: boolean; id: string }> {
    const bill = await this.findById(id);
    await this.restBillModel.deleteOne({ _id: bill._id }).exec();
    return { success: true, id };
  }
}

