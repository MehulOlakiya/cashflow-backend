import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bill, BillDocument } from './schemas/bill.schema';
import { CreateBillDto } from './dto/create-bill.dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectModel(Bill.name)
    private readonly billModel: Model<BillDocument>,
  ) {}

  async create(userId: string, dto: CreateBillDto): Promise<BillDocument> {
    const bill = new this.billModel({
      ...dto,
      customerName: dto.customerName ?? '',
      customerMobile: dto.customerMobile ?? '',
      discountPercent: dto.discountPercent ?? 0,
      discountAmount: dto.discountAmount ?? 0,
      userId: new Types.ObjectId(userId),
    });
    return bill.save();
  }

  async findAll(userId: string): Promise<BillDocument[]> {
    return this.billModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(userId: string, id: string): Promise<BillDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Bill not found');
    }
    const bill = await this.billModel.findById(id).exec();
    if (!bill) {
      throw new NotFoundException('Bill not found');
    }
    if (bill.userId.toString() !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return bill;
  }

  async remove(userId: string, id: string): Promise<void> {
    const bill = await this.findOne(userId, id);
    await this.billModel.findByIdAndDelete(bill._id).exec();
  }

  private toResponse(bill: BillDocument) {
    return {
      id: (bill._id as Types.ObjectId).toString(),
      createdAt: (bill as any).createdAt,
      customer: {
        name: bill.customerName,
        mobile: bill.customerMobile,
      },
      items: bill.items,
      subtotal: bill.subtotal,
      discountPercent: bill.discountPercent,
      discountAmount: bill.discountAmount,
      grandTotal: bill.grandTotal,
    };
  }
}
